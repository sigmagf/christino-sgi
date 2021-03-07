import { IPagination, IWork } from '@christino-sgi/common';
import { QueryTypes } from 'sequelize';
import { v4 } from 'uuid';

import { sequelize } from '~/config/sequelize';
import { Work } from '~/entities/sequelize/Work';
import { WorkHistory } from '~/entities/sequelize/WorkHistory';
import { IWorksListFilters } from '~/interfaces';

import { IWorkCreateOrUpdate, IWorksRepository } from '../IWorksRepository';

export class SequelizeWorksRepository implements IWorksRepository {
  private makeSpecialWhereString(filters: IWorksListFilters) {
    const filtersPart: string[] = [];

    filtersPart.push(filters.clientId ? `cl.id = '${filters.clientId}'` : null);
    filtersPart.push(filters.serviceId ? `sv.id = '${filters.serviceId}'` : null);
    filtersPart.push(filters.sectorId ? `sc.id = '${filters.sectorId}'` : null);

    if(filters.group === '-1') {
      filtersPart.push('cl.group IS NULL');
    } else {
      filtersPart.push(filters.group ? `cl.group ILIKE '%${filters.group}%'` : null);
    }

    filtersPart.push(filters.identifier ? `wk.identifier ILIKE '%${filters.identifier}%'` : null);
    filtersPart.push(filters.value ? `wk.value = ${filters.value}` : null);

    if(Array.isArray(filters.status)) {
      const statusPart: string[] = [];
      filters.status.forEach((el) => statusPart.push(el ? `wk.status = ${el}` : null));
      filtersPart.push(`(${statusPart.filter((el) => el !== null).join(' OR ')})`);
    } else {
      filtersPart.push(filters.status ? `wk.status = ${filters.status}` : null);
    }

    if(filters.timeCourseStart) {
      filtersPart.push(`wk.created_at >= '${filters.timeCourseStart}'`);
    }

    if(filters.timeCourseEnd) {
      filtersPart.push(`wk.created_at <= '${filters.timeCourseEnd}'`);
    }

    return filtersPart.filter((el) => el !== null).join(' AND ');
  }

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

    const fixedData: IWork[] = await Promise.all(data.map(async (el) => {
      const histories = await WorkHistory.findAll({ where: { workId: el.workId }, order: [['createdAt', 'DESC']] });

      return {
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
      };
    }));

    return fixedData;
  }

  async list(page: number, maxResults: number, filters: IWorksListFilters): Promise<IPagination<IWork> | IWork[]> {
    const where = this.makeSpecialWhereString(filters);
    const limit = maxResults > 100 ? 100 : maxResults;

    if(filters.pagination) {
      const maxRows = (await sequelize.query(this.selectQuery(where), { type: QueryTypes.SELECT })).length;
      const pages = Math.ceil(maxRows / limit);
      const offset = (page - 1) * limit;
      const dbPageData = await sequelize.query(this.selectQuery(where, limit, offset), { type: QueryTypes.SELECT });

      return {
        page: {
          total: pages || 1,
          limit,
          current: page,
        },
        data: await this.fixData(dbPageData),
      };
    }

    const dbData = await sequelize.query(this.selectQuery(where), { type: QueryTypes.SELECT });
    return this.fixData(dbData);
  }

  async findById(id: string): Promise<IWork> {
    const dbData = await Work.findByPk(id, { include: { all: true } });
    return dbData;
  }

  async create(data: IWorkCreateOrUpdate): Promise<IWork> {
    const entryData = { ...data, id: v4(), history: undefined };
    const entry = await Work.create(entryData);

    await WorkHistory.create({
      id: v4(),
      workId: entry.id,
      details: data.history,
    });

    const dbData = await Work.findByPk(entry.id, { include: { all: true } });
    return dbData;
  }

  async update(id: string, data: Partial<IWorkCreateOrUpdate>): Promise<IWork> {
    const entryData = { ...data, history: undefined };
    await Work.update(entryData, { where: { id } });

    await WorkHistory.create({
      id: v4(),
      workId: id,
      details: data.history,
    });

    const dbData = await Work.findByPk(id, { include: { all: true } });
    return dbData;
  }

  async delete(id: string): Promise<void> {
    await (await Work.findByPk(id)).destroy();
  }
}
