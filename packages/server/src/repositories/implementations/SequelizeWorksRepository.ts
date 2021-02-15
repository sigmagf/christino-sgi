import { QueryTypes } from 'sequelize';

import { sequelize } from '~/config/sequelize';
import { IWork } from '~/entities/IWork';
import { Work } from '~/entities/sequelize/Work';
import { WorkHistory } from '~/entities/sequelize/WorkHistory';
import { IWorksListFilters, IPagination } from '~/interfaces';

import { IWorkCreateOrUpdate, IWorksRepository } from '../IWorksRepository';

export class SequelizeWorksRepository implements IWorksRepository {
  private selectQuery(where?: string, limit?: number, offset?: number) {
    return `
      SELECT
      wk.id as "work_id",
      wk.identifier as "work_identifier",
      wk.value as "work_value",
      wk.details as "work_details",
      wk.status as "work_status",
      wk.created_at as "work_created_at",
      wk.updated_at as "work_updated_at",
      
      cl.id AS "client_id",
      cl.name AS "client_name",
      cl.document AS "client_document",
      cl.group AS "client_group",
      cl.email AS "client_email",
      cl.phone1 AS "client_phone1",
      cl.phone2 AS "client_phone2",
      cl.created_at AS "client_created_at",
      cl.updated_at AS "client_updated_at",
      
      sv.id AS "service_id",
      sv.name AS "service_name",
      sv.created_at AS "service_created_at",
      sv.updated_at AS "service_updated_at",
      
      sc.id AS "sector_id",
      sc.name AS "sector_name",
      sc.created_at AS "sector_created_at",
      sc.updated_at AS "sector_updated_at",
      
      wh.id AS "history_id",
      wh.details AS "history_details",
      wh.created_at AS "history_created_at",
      wh.updated_at AS "history_updated_at"
      
      FROM works as wk
      LEFT OUTER JOIN clients AS cl ON wk.client_id = cl.id
      LEFT OUTER JOIN services AS sv ON wk.service_id = sv.id
      LEFT OUTER JOIN sectors AS sc ON sv.sector_id = sc.id
      LEFT OUTER JOIN work_histories AS wh ON wk.id = wh.work_id
      ${where ? `WHERE ${where}` : ''}
      ORDER BY wk.created_at DESC
      ${offset ? `OFFSET ${offset}` : ''}
      ${limit ? `LIMIT ${limit}` : ''}
    `;
  }

  private fixData(data: any[]) {
    if(!data) {
      return null;
    }

    const fixedData: IWork[] = [];

    data.forEach((el) => {
      const index = fixedData.findIndex((dt) => dt.id === el.work_id);

      if(index === -1) {
        fixedData.push({
          id: el.work_id,
          clientId: el.client_id,
          serviceId: el.service_id,
          identifier: el.work_identifier,
          value: el.work_value,
          details: el.work_details,
          status: el.work_status,
          createdAt: el.work_created_at,
          updatedAt: el.work_updated_at,
          client: {
            id: el.client_id,
            name: el.client_name,
            document: el.client_document,
            group: el.client_group,
            email: el.client_email,
            phone1: el.client_phone1,
            phone2: el.client_phone2,
            createdAt: el.client_created_at,
            updatedAt: el.client_updated_at,
          },
          service: {
            id: el.service_id,
            name: el.service_name,
            sectorId: el.sector_id,
            sector: {
              id: el.sector_id,
              name: el.sector_name,
              createdAt: el.sector_created_at,
              updatedAt: el.sector_updated_at,
            },
            createdAt: el.service_created_at,
            updatedAt: el.service_updated_at,
          },
          histories: [{
            id: el.history_id,
            workId: el.work_id,
            details: el.history_details,
            createdAt: el.history_created_at,
            updatedAt: el.history_updated_at,
          }],
        });
      } else {
        fixedData[index].histories.push({
          id: el.history_id,
          workId: el.work_id,
          details: el.history_details,
          createdAt: el.history_created_at,
          updatedAt: el.history_updated_at,
        });
      }
    });

    return fixedData;
  }

  async list(page: number, limit: number, filters: IWorksListFilters): Promise<IPagination<IWork> | IWork[]> {
    const effectiveLimit = limit > 100 ? 100 : limit;

    if(filters.pagination) {
      const maxRows = await Work.count();
      const pages = Math.ceil(maxRows / effectiveLimit);
      const offset = (page - 1) * effectiveLimit;
      const dbPageData = await sequelize.query(this.selectQuery(undefined, effectiveLimit, offset), { type: QueryTypes.SELECT });

      return {
        page: {
          total: pages < 1 ? 1 : pages,
          limit: effectiveLimit,
          current: page,
        },
        data: this.fixData(dbPageData),
      };
    }

    const dbData = await Work.findAll({ include: { all: true, nested: true } });
    return this.fixData(dbData);
  }

  async findById(id: string): Promise<IWork> {
    const dbData = await sequelize.query(this.selectQuery(`wk.id = '${id}'`), { type: QueryTypes.SELECT });
    return this.fixData(dbData)[0];
  }

  async create(data: IWorkCreateOrUpdate): Promise<IWork> {
    const entry = await Work.create({ data, history: undefined });

    await WorkHistory.create({
      workId: entry.id,
      details: data.history,
    });

    const dbData = await sequelize.query(this.selectQuery(`wk.id = '${entry.id}'`), { type: QueryTypes.SELECT });
    return this.fixData(dbData)[0];
  }

  async update(id: string, data: Partial<Omit<IWorkCreateOrUpdate, 'id'>>): Promise<IWork> {
    await Work.update(data, { where: { id } });

    const dbData = await sequelize.query(this.selectQuery(`wk.id = '${id}'`), { type: QueryTypes.SELECT });
    return this.fixData(dbData)[0];
  }

  async delete(id: string): Promise<void> {
    await (await Work.findByPk(id)).destroy();
  }
}
