import { getRepository } from 'typeorm';
import { v4 } from 'uuid';

import { Client } from '~/entities/Client';
import { Sector } from '~/entities/Sector';
import { Service } from '~/entities/Service';
import { Work } from '~/entities/Work';
import { WorkHistory } from '~/entities/WorkHistory';
import { IPagination, IWorksListFilters } from '~/interfaces';

import { IWorkCreateOrUpdate, IWorksRepository } from '../IWorksRepository';

export class TypeORMWorksRepository implements IWorksRepository {
  private makeSpecialWhereString(filters: IWorksListFilters) {
    const filtersPart: string[] = [];
    // w = works
    // c = clients
    // s = services
    // sc = sectors

    // Clients
    filtersPart.push(filters.name ? `c.name LIKE '%${filters.name}%'` : null);
    filtersPart.push(filters.document ? `c.document LIKE '%${filters.document}%'` : null);
    filtersPart.push(filters.group ? `c.group LIKE '%${filters.group}%'` : null);

    // Work
    filtersPart.push(filters.service ? `w.service = '%${filters.service}%'` : null);
    filtersPart.push(filters.identifier ? `w.identifier LIKE '%${filters.identifier}%'` : null);
    filtersPart.push(filters.value ? `w.value LIKE '%${filters.value}%'` : null);
    filtersPart.push(filters.details ? `w.details LIKE '%${filters.details}%'` : null);
    filtersPart.push(filters.status ? `w.status = ${filters.status}` : null);

    return filtersPart.filter((el) => el !== null).join(' AND ');
  }

  async list(page = 1, limit = 10, filters: IWorksListFilters): Promise<IPagination<Work> | Work[]> {
    const whereString = this.makeSpecialWhereString(filters);
    const effectiveLimit = limit > 100 ? 100 : limit;

    if(filters.pagination) {
      const maxRows = await getRepository(Work)
        .createQueryBuilder('w')
        .leftJoinAndMapOne('w.client', Client, 'c', 'w.client_id = c.id')
        .leftJoinAndMapOne('w.service', Service, 's', 'w.service_id = s.id')
        .leftJoinAndMapOne('w.sector', Sector, 'sc', 's.sector_id = sc.id')
        .leftJoinAndMapMany('w.history', WorkHistory, 'wh', 'wh.work_id = w.id')
        .where(whereString)
        .getCount();

      const pages = Math.ceil(maxRows / effectiveLimit);
      const startIndex = (page - 1) * effectiveLimit;

      const dbPageData = await getRepository(Work)
        .createQueryBuilder('w')
        .leftJoinAndMapOne('w.client', Client, 'c', 'w.client_id = c.id')
        .leftJoinAndMapOne('w.service', Service, 's', 'w.service_id = s.id')
        .leftJoinAndMapOne('w.sector', Sector, 'sc', 's.sector_id = sc.id')
        .leftJoinAndMapMany('w.history', WorkHistory, 'wh', 'wh.work_id = w.id')
        .offset(startIndex)
        .limit(effectiveLimit)
        .getMany();

      return {
        page: {
          total: pages < 1 ? 1 : pages,
          limit: effectiveLimit,
          current: page,
        },
        data: dbPageData,
      };
    }

    const dbData = await getRepository(Work)
      .createQueryBuilder('w')
      .leftJoinAndMapOne('w.client', Client, 'c', 'w.client_id = c.id')
      .leftJoinAndMapOne('w.service', Service, 's', 'w.service_id = s.id')
      .leftJoinAndMapOne('w.sector', Sector, 'sc', 's.sector_id = sc.id')
      .leftJoinAndMapMany('w.history', WorkHistory, 'wh', 'wh.work_id = w.id')
      .getMany();

    return dbData;
  }

  async findById(id: string): Promise<Work> {
    const dbData = await getRepository(Work)
      .createQueryBuilder('w')
      .leftJoinAndMapOne('w.client', Client, 'c', 'w.client_id = c.id')
      .leftJoinAndMapOne('w.service', Service, 's', 'w.service_id = s.id')
      .leftJoinAndMapOne('w.sector', Sector, 'sc', 's.sector_id = sc.id')
      .leftJoinAndMapMany('w.history', WorkHistory, 'wh', 'wh.work_id = w.id')
      .where(`w.id = '${id}'`)
      .getOne();

    return dbData;
  }

  async create(data: IWorkCreateOrUpdate): Promise<Work> {
    const work = await getRepository(Work).save({
      id: v4(),
      client_id: data.client_id,
      service_id: data.service_id,
      identifier: data.identifier,
      value: data.value,
      details: data.details,
      status: data.status,
    });

    if(data.history && data.history.length > 0) {
      await Promise.all(data.history.map(async (el) => {
        await getRepository(WorkHistory).save({
          id: v4(),
          work_id: work.id,
          details: el,
        });
      }));
    }

    const dbData = await this.findById(work.id);
    return dbData;
  }

  async update(id: string, data: IWorkCreateOrUpdate): Promise<Work> {
    const oldData = await getRepository(Work).findOne({ id });

    await getRepository(Work).update(id, {
      client_id: data.client_id || oldData.client_id,
      service_id: data.service_id || oldData.service_id,
      identifier: data.identifier || oldData.identifier,
      value: data.value || oldData.value,
      details: data.details || oldData.details,
      status: data.status || oldData.status,
    });

    if(data.history && data.history.length > 0) {
      await Promise.all(data.history.map(async (el) => {
        await getRepository(WorkHistory).save({
          id: v4(),
          work_id: id,
          details: el,
        });
      }));
    }

    const dbData = await this.findById(id);
    return dbData;
  }

  async delete(id: string): Promise<void> {
    await getRepository(Work).delete(id);
  }
}
