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
      wk.id as "workId",
      wk.identifier as "workIdentifier",
      wk.value as "workValue",
      wk.details as "workDetails",
      wk.status as "workStatus",
      wk.created_at as "workCreatedAt",
      wk.updated_at as "workUpdatedAt",
      
      cl.id AS "clientId",
      cl.name AS "clientName",
      cl.document AS "clientDocument",
      cl.group AS "clientGroup",
      cl.email AS "clientEmail",
      cl.phone1 AS "clientPhone1",
      cl.phone2 AS "clientPhone2",
      cl.created_at AS "clientCreatedAt",
      cl.updated_at AS "clientUpdatedAt",
      
      sv.id AS "serviceId",
      sv.name AS "serviceName",
      sv.created_at AS "serviceCreatedAt",
      sv.updated_at AS "serviceUpdatedAt",
      
      sc.id AS "sectorId",
      sc.name AS "sectorName",
      sc.created_at AS "sectorCreatedAt",
      sc.updated_at AS "sectorUpdatedAt"
      
      FROM works as wk
      LEFT JOIN clients AS cl ON wk.client_id = cl.id
      LEFT JOIN services AS sv ON wk.service_id = sv.id
      LEFT JOIN sectors AS sc ON sv.sector_id = sc.id
      ${where ? `WHERE ${where}` : ''}
      ORDER BY wk.created_at DESC
      ${offset ? `OFFSET ${offset}` : ''}
      ${limit ? `LIMIT ${limit}` : ''}
    `;
  }

  private async fixData(data: any[]) {
    if(!data) {
      return null;
    }

    const fixedData: IWork[] = [];

    await Promise.all(data.map(async (el) => {
      const histories = await WorkHistory.findAll({ where: { workId: el.work_id }, order: [['createdAt', 'DESC']] });

      fixedData.push({
        id: el.workId,
        clientId: el.clientId,
        client: {
          id: el.clientId,
          name: el.clientName,
          document: el.clientDocument,
          group: el.clientGroup,
          email: el.clientEmail,
          phone1: el.clientPhone1,
          phone2: el.clientPhone2,
          createdAt: el.clientCreatedAt,
          updatedAt: el.clientUpdatedAt,
        },
        serviceId: el.serviceId,
        service: {
          id: el.serviceId,
          name: el.serviceName,
          sectorId: el.sectorId,
          sector: {
            id: el.sectorId,
            name: el.sectorName,
            createdAt: el.sectorCreatedAt,
            updatedAt: el.sectorUpdatedAt,
          },
          createdAt: el.serviceCreatedAt,
          updatedAt: el.serviceUpdatedAt,
        },
        identifier: el.workIdentifier,
        value: el.workValue,
        details: el.workDetails,
        status: el.workStatus,
        histories,
        createdAt: el.workCreatedAt,
        updatedAt: el.workUpdatedAt,
      });
    }));

    return fixedData;
  }

  async list(page: number, maxResults: number, filters: IWorksListFilters): Promise<IPagination<IWork> | IWork[]> {
    const limit = maxResults > 100 ? 100 : maxResults;

    if(filters.pagination) {
      const maxRows = await Work.count();
      const pages = Math.ceil(maxRows / limit);
      const offset = (page - 1) * limit;
      const dbPageData = await sequelize.query(this.selectQuery(undefined, limit, offset), { type: QueryTypes.SELECT });

      return {
        page: {
          total: pages || 1,
          limit,
          current: page,
        },
        data: await this.fixData(dbPageData),
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
