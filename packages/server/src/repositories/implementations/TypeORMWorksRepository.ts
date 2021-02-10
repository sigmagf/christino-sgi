import { getRepository } from 'typeorm';
import { v4 } from 'uuid';

import { Client } from '~/entities/Client';
import { Sector } from '~/entities/Sector';
import { Service } from '~/entities/Service';
import { Work } from '~/entities/Work';
import { WorkHistory } from '~/entities/WorkHistory';

import { IClientsListFilters, IPagination } from '~/interfaces';

import { IWorkCreateOrUpdate, IWorksRepository } from '../IWorksRepository';

export class TypeORMWorksRepository implements IWorksRepository {
  async list(page = 1, limit = 10, filters: IClientsListFilters): Promise<IPagination<Work> | Work[]> {
    // const filtersString = makeWhereString({ ...filters, pagination: undefined });
    const effectiveLimit = limit > 100 ? 100 : limit;

    if(filters.pagination) {
      const maxRows = await getRepository(Work)
        .createQueryBuilder('wk')
        .leftJoinAndMapOne('wk.client', Client, 'cl', 'wk.client_id = cl.id')
        .leftJoinAndMapOne('wk.service', Service, 'sv', 'wk.service_id = sv.id')
        .leftJoinAndMapOne('wk.sector', Sector, 'sc', 'sv.sector_id = sc.id')
        .leftJoinAndMapMany('wk.histories', WorkHistory, 'ht', 'ht.work_id = wk.id')
        .getCount();
      console.log(maxRows);

      const pages = Math.ceil(maxRows / effectiveLimit);
      const startIndex = (page - 1) * effectiveLimit;

      const dbPageData = await getRepository(Work)
        .createQueryBuilder('wk')
        .leftJoinAndMapOne('wk.client', Client, 'cl', 'wk.client_id = cl.id')
        .leftJoinAndMapOne('wk.service', Service, 'sv', 'wk.service_id = sv.id')
        .leftJoinAndMapOne('wk.sector', Sector, 'sc', 'sv.sector_id = sc.id')
        .leftJoinAndMapMany('wk.histories', WorkHistory, 'ht', 'ht.work_id = wk.id')
        .offset(startIndex)
        .limit(effectiveLimit)
        .getMany();
      
      console.log(startIndex);
      console.log(effectiveLimit);

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
      .createQueryBuilder('wk')
      .leftJoinAndMapOne('wk.client', Client, 'cl', 'wk.client_id = cl.id')
      .leftJoinAndMapOne('wk.service', Service, 'sv', 'wk.service_id = sv.id')
      .leftJoinAndMapOne('wk.sector', Sector, 'sc', 'sv.sector_id = sc.id')
      .leftJoinAndMapMany('wk.histories', WorkHistory, 'ht', 'ht.work_id = wk.id')
      .getMany();

    return dbData;
  }

  async findById(id: string): Promise<Work> {
    const dbData = await getRepository(Work)
      .createQueryBuilder('wk')
      .leftJoinAndMapOne('wk.client', Client, 'cl', 'wk.client_id = cl.id')
      .leftJoinAndMapOne('wk.service', Service, 'sv', 'wk.service_id = sv.id')
      .leftJoinAndMapOne('wk.sector', Sector, 'sc', 'sv.sector_id = sc.id')
      .leftJoinAndMapMany('wk.histories', WorkHistory, 'ht', 'ht.work_id = wk.id')
      .where(`wk.id = '${id}'`)
      .getOne();

    return dbData;
  }

  async create(data: IWorkCreateOrUpdate): Promise<Work> {
    const insertedData = await getRepository(Work).save({
      id: v4(),
      client_id: data.client_id,
      service_id: data.service_id,
      identifier: data.identifier,
      value: data.value,
      details: data.details,
      status: data.status,
    });

    await getRepository(WorkHistory).save({
      id: v4(),
      work_id: insertedData.id,
      details: data.history,
    });

    const dbData = await getRepository(Work)
      .createQueryBuilder('wk')
      .leftJoinAndMapOne('wk.client', Client, 'cl', 'wk.client_id = cl.id')
      .leftJoinAndMapOne('wk.service', Service, 'sv', 'wk.service_id = sv.id')
      .leftJoinAndMapOne('wk.sector', Sector, 'sc', 'sv.sector_id = sc.id')
      .leftJoinAndMapMany('wk.histories', WorkHistory, 'ht', 'ht.work_id = wk.id')
      .where(`wk.id = '${insertedData.id}'`)
      .getOne();

    return dbData;
  }

  async update(id: string, data: IWorkCreateOrUpdate): Promise<Work> {
    const oldData = await getRepository(Work).createQueryBuilder('w').where(`w.id = '${id}'`).getOne();

    await getRepository(Work).update(id, {
      client_id: data.client_id || oldData.client_id,
      service_id: data.service_id || oldData.service_id,
      identifier: data.identifier || oldData.identifier,
      value: data.value || oldData.value,
      details: data.details || oldData.details,
      status: data.status === undefined || data.status === null || data.status < 0 ? oldData.status : data.status,
    });

    await getRepository(WorkHistory).save({
      id: v4(),
      work_id: id,
      details: data.history,
    });

    const dbData = await getRepository(Work)
      .createQueryBuilder('wk')
      .leftJoinAndMapOne('wk.client', Client, 'cl', 'wk.client_id = cl.id')
      .leftJoinAndMapOne('wk.service', Service, 'sv', 'wk.service_id = sv.id')
      .leftJoinAndMapOne('wk.sector', Sector, 'sc', 'sv.sector_id = sc.id')
      .leftJoinAndMapMany('wk.histories', WorkHistory, 'ht', 'ht.work_id = wk.id')
      .where(`wk.id = '${id}'`)
      .getOne();

    return dbData;
  }

  async delete(id: string): Promise<void> {
    await getRepository(Work).delete(id);
  }
}
