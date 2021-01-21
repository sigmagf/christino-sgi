import { getRepository, Like } from 'typeorm';

import { Vehicle } from '~/entities/Vehicle';
import { IPagination, IVehiclesListFilters } from '~/interfaces';
import { sortVehicles } from '~/utils/sortVehicles';

import { IVehiclesRepository } from '../IVehiclesRepository';

export class TypeORMVehiclesRepository implements IVehiclesRepository {
  async list(page: number, limit: number, filters: IVehiclesListFilters): Promise<IPagination<Vehicle> | Vehicle[]> {
    if(filters.pagination) {
      const maxVehicles = await getRepository(Vehicle).count({
        where: {
          client_id: filters.client_id,
          plate: Like(`%${filters.plate}%`),
          renavam: Like(`%${filters.renavam}%`),
          crv: Like(`%${filters.crv}%`),
          brand_model: Like(`%${filters.brand_model}%`),
          client: {
            folder: Like(`%${filters.folder}%`),
          },
        },
      });

      const pages = Math.ceil((maxVehicles) / limit);
      const startIndex = (page - 1) * limit;

      const dbPageData = await getRepository(Vehicle).find({
        where: {
          client_id: filters.client_id,
          plate: Like(`%${filters.plate}%`),
          renavam: Like(`%${filters.renavam}%`),
          crv: Like(`%${filters.crv}%`),
          brand_model: Like(`%${filters.brand_model}%`),
          client: {
            folder: Like(`%${filters.folder}%`),
          },
        },
        skip: startIndex,
        take: limit,
      });

      return {
        page: {
          total: pages,
          limit,
          current: page,
        },
        data: sortVehicles(dbPageData),
      };
    }

    const dbData = await getRepository(Vehicle).find({
      where: {
        client_id: filters.client_id,
        plate: Like(`%${filters.plate}%`),
        renavam: Like(`%${filters.renavam}%`),
        crv: Like(`%${filters.crv}%`),
        brand_model: Like(`%${filters.brand_model}%`),
        client: {
          folder: Like(`%${filters.folder}%`),
        },
      },
      take: 100,
    });
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
