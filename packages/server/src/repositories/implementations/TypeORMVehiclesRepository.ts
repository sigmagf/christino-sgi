import { getRepository } from 'typeorm';

import { Client } from '~/entities/Client';
import { Vehicle } from '~/entities/Vehicle';
import { IPagination, IVehiclesListFilters } from '~/interfaces';
import { makeWhereString } from '~/utils/makeWhereString';
import { sortVehicles } from '~/utils/sortVehicles';

import { IVehiclesRepository } from '../IVehiclesRepository';

export class TypeORMVehiclesRepository implements IVehiclesRepository {
  async list(page: number, limit: number, filters: IVehiclesListFilters): Promise<IPagination<Vehicle> | Vehicle[]> {
    const filtersString = makeWhereString({ ...filters, group: undefined, pagination: undefined });

    if(filters.pagination) {
      const maxRows = await getRepository(Vehicle)
        .createQueryBuilder('v')
        .leftJoinAndMapOne('v.client', Client, 'c', 'v.client_id = c.id')
        .where(filtersString)
        .andWhere(filters.group ? `c.group LIKE '%${filters.group}%'` : '')
        .getCount();

      const pages = Math.ceil(maxRows / limit);
      const startIndex = (page - 1) * limit;

      const dbPageData = await getRepository(Vehicle)
        .createQueryBuilder('v')
        .leftJoinAndMapOne('v.client', Client, 'c', 'v.client_id = c.id')
        .where(filtersString)
        .andWhere(filters.group ? `c.group LIKE '%${filters.group}%'` : '')
        .skip(startIndex)
        .take(limit)
        .orderBy('SUBSTRING(v.plate)', 'ASC')
        .orderBy('c.name', 'ASC')
        .getMany();

      return {
        page: {
          total: pages < 1 ? 1 : pages,
          limit,
          current: page,
        },
        data: sortVehicles(dbPageData),
      };
    }

    const dbData = await getRepository(Vehicle)
      .createQueryBuilder('v')
      .leftJoinAndMapOne('v.client', Client, 'c', 'v.client_id = c.id')
      .where(filtersString)
      .andWhere(filters.group ? `c.group LIKE '%${filters.group}%'` : '')
      .take(100)
      .orderBy('SUBSTRING(v.plate)', 'ASC')
      .orderBy('c.name', 'ASC')
      .getMany();

    return sortVehicles(dbData);
  }

  async findById(id: string): Promise<Vehicle> {
    const dbData = await getRepository(Vehicle).findOne({ where: { id } });

    return dbData;
  }

  async findByPlate(plate: string): Promise<Vehicle> {
    const dbData = await getRepository(Vehicle).findOne({ where: { plate } });

    return dbData;
  }

  async findByRenavam(renavam: string): Promise<Vehicle> {
    const dbData = await getRepository(Vehicle).findOne({ where: { renavam } });

    return dbData;
  }

  async findByClientPlate(clientId: string, plate: string): Promise<Vehicle> {
    const dbData = await getRepository(Vehicle).findOne({ where: { clientId, plate } });

    return dbData;
  }

  async findByClientRenavam(clientId: string, renavam: string): Promise<Vehicle> {
    const dbData = await getRepository(Vehicle).findOne({ where: { clientId, renavam } });

    return dbData;
  }

  async create(data: Omit<Vehicle, 'id'|'createdAt'|'updatedAt'>): Promise<Vehicle> {
    const dbData = await getRepository(Vehicle).save(data);

    return dbData;
  }

  async update(id: string, data: Omit<Vehicle, 'id'|'createdAt'|'updatedAt'>): Promise<Vehicle> {
    await getRepository(Vehicle).update(id, data);

    const newData = await getRepository(Vehicle).findOne({ where: { id } });
    return newData;
  }

  async delete(id: string): Promise<void> {
    await getRepository(Vehicle).delete(id);
  }
}
