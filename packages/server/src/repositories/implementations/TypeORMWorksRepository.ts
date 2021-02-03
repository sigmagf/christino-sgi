import { getRepository } from 'typeorm';
import { v4 } from 'uuid';

import { Client } from '~/entities/Client';
import { Sector } from '~/entities/Sector';
import { Service } from '~/entities/Service';
import { Work } from '~/entities/Work';
import { WorkExpense } from '~/entities/WorkExpense';
import { WorkHistory } from '~/entities/WorkHistory';
import { WorkRevenue } from '~/entities/WorkRevenue';
import { IPagination, IWorksListFilters } from '~/interfaces';

import { IWorksRepository } from '../IWorksRepository';

export class TypeORMVehiclesRepository implements IWorksRepository {
  private makeSpecialWhereString(filters: IWorksListFilters) {
    const filtersPart: string[] = [];

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
        .leftJoinAndMapMany('w.revenues', WorkRevenue, 'wr', 'wr.work_id = w.id')
        .leftJoinAndMapMany('w.expenses', WorkExpense, 'we', 'we.work_id = w.id')
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
        .leftJoinAndMapMany('w.revenues', WorkRevenue, 'wr', 'wr.work_id = w.id')
        .leftJoinAndMapMany('w.expenses', WorkExpense, 'we', 'we.work_id = w.id')
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
      .leftJoinAndMapMany('w.revenues', WorkRevenue, 'wr', 'wr.work_id = w.id')
      .leftJoinAndMapMany('w.expenses', WorkExpense, 'we', 'we.work_id = w.id')
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
      .leftJoinAndMapMany('w.revenues', WorkRevenue, 'wr', 'wr.work_id = w.id')
      .leftJoinAndMapMany('w.expenses', WorkExpense, 'we', 'we.work_id = w.id')
      .where(`w.id = '${id}'`)
      .getOne();

    return dbData;
  }

  async create(data: Omit<Work, 'id'|'created_at'|'updated_at'>): Promise<Work> {
    const dbData = await getRepository(Work).save({ ...data, id: v4() });

    return dbData;
  }

  async update(id: string, data: Omit<Work, 'id'|'created_at'|'updated_at'>): Promise<Work> {
    const oldData = await getRepository(Work).findOne({ id });

    await getRepository(Work).update(id, { });

    const dbData = await getRepository(Work).findOne({ where: { id } });
    return dbData;
  }

  async delete(id: string): Promise<void> {
    await getRepository(Work).delete(id);
  }
}
