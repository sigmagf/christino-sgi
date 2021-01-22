import { getRepository } from 'typeorm';

import { Vehicle } from '~/entities/Vehicle';
import { IPagination, IVehiclesListFilters } from '~/interfaces';
import { createWhere } from '~/utils/createWhere';
import { sortVehicles } from '~/utils/sortVehicles';

import { IVehiclesRepository } from '../IVehiclesRepository';

export class TypeORMVehiclesRepository implements IVehiclesRepository {
  async list(page: number, limit: number, filters: IVehiclesListFilters): Promise<IPagination<Vehicle> | Vehicle[]> {
    const filtersString = createWhere({ ...filters, client: undefined, pagination: undefined });

    if(filters.pagination) {
      const pages = Math.ceil(await getRepository(Vehicle).count({ where: filtersString }) / limit);
      const startIndex = (page - 1) * limit;

      const dbPageData = await getRepository(Vehicle).find({ where: filtersString, skip: startIndex, take: limit });

      return {
        page: {
          total: pages < 1 ? 1 : pages,
          limit,
          current: page,
        },
        data: sortVehicles(dbPageData),
      };
    }

    const dbData = await getRepository(Vehicle).find({ where: filtersString });

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

  async findByClientPlate(client_id: string, plate: string): Promise<Vehicle> {
    const dbData = await getRepository(Vehicle).findOne({ where: { client_id, plate } });

    return dbData;
  }

  async findByClientRenavam(client_id: string, renavam: string): Promise<Vehicle> {
    const dbData = await getRepository(Vehicle).findOne({ where: { client_id, renavam } });

    return dbData;
  }

  async create(data: Omit<Vehicle, 'id'|'created_at'|'updated_at'>): Promise<Vehicle> {
    const dbData = await getRepository(Vehicle).save(data);

    return dbData;
  }

  async update(id: string, data: Omit<Vehicle, 'id'|'created_at'|'updated_at'>): Promise<Vehicle> {
    await getRepository(Vehicle).update(id, data);

    const newData = await getRepository(Vehicle).findOne({ where: { id } });
    return newData;
  }

  async delete(id: string): Promise<void> {
    await getRepository(Vehicle).delete(id);
  }
}
