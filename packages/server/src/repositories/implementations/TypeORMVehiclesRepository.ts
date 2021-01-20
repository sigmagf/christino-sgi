import { getRepository } from 'typeorm';

import { Vehicle } from '~/entities/Vehicle';
import { IPagination } from '~/interfaces';
import { sortVehicles } from '~/utils/sortVehicles';

import { IVehiclesRepository } from '../IVehiclesRepository';

export class TypeORMVehiclesRepository implements IVehiclesRepository {
  async list(page: number, limit: number, pagination = true): Promise<IPagination<Vehicle> | Vehicle[]> {
    if(pagination) {
      const pages = Math.ceil((await getRepository(Vehicle).count()) / limit);
      const startIndex = (page - 1) * limit;

      const dbPageData = await getRepository(Vehicle).find({ skip: startIndex, take: limit });

      return {
        page: {
          total: pages,
          limit,
          current: page,
        },
        data: sortVehicles(dbPageData),
      };
    }

    const dbData = await getRepository(Vehicle).find({ take: 100 });
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
    const oldData = await getRepository(Vehicle).findOne({ where: { id } });

    await getRepository(Vehicle).update(id, {
      client_id: data.client_id || oldData.client_id,
      plate: data.plate || oldData.plate,
      renavam: data.renavam || oldData.renavam,
      crv: data.crv || oldData.crv,
      brand_model: data.brand_model || oldData.brand_model,
      type: data.type || oldData.type,
      details: data.details || oldData.details,
      status: data.status || oldData.status,
      issued_on: data.issued_on || oldData.issued_on,
    });

    const newData = await getRepository(Vehicle).findOne({ where: { id } });
    return newData;
  }

  async delete(id: string): Promise<void> {
    await getRepository(Vehicle).delete(id);
  }
}
