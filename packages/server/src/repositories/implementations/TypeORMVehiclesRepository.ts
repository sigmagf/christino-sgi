import { getRepository } from 'typeorm';

import { Client } from '~/entities/Client';
import { Vehicle } from '~/entities/Vehicle';
import { IPagination, IVehiclesListFilters } from '~/interfaces';

import { IVehiclesRepository } from '../IVehiclesRepository';

export class TypeORMVehiclesRepository implements IVehiclesRepository {
  private makeSpecialWhereString(filters: IVehiclesListFilters) {
    const filtersPart: string[] = [];

    filtersPart.push(filters.client_id ? `c.id = '${filters.client_id}'` : null);

    if(filters.group === '-1') {
      filtersPart.push('c.group IS NULL');
    } else {
      filtersPart.push(filters.group ? `c.group LIKE '%${filters.group}%'` : null);
    }

    filtersPart.push(filters.plate ? `v.plate LIKE '%${filters.plate}%'` : null);
    filtersPart.push(filters.renavam ? `v.renavam LIKE '%${filters.renavam}%'` : null);
    filtersPart.push(filters.crv ? `v.crv LIKE '%${filters.crv}%'` : null);
    filtersPart.push(filters.brand_model ? `v.brand_model LIKE '%${filters.brand_model}%'` : null);

    if(Array.isArray(filters.status)) {
      const statusPart: string[] = [];
      filters.status.forEach((el) => statusPart.push(el ? `v.status = ${el}` : null));
      filtersPart.push(`(${statusPart.join(' OR ')})`);
    } else {
      filtersPart.push(filters.status ? `v.status = ${filters.status}` : null);
    }

    filtersPart.push(filters.plate_end ? `v.plate LIKE '%${filters.plate_end}'` : null);

    if(!filters.include_truck) {
      filtersPart.push('v.type <> \'CAMINHAO\' AND v.type <> \'C. TRATOR\'');
    }

    return filtersPart.filter((el) => el !== null).join(' AND ');
  }

  async list(page = 1, limit = 10, filters: IVehiclesListFilters): Promise<IPagination<Vehicle> | Vehicle[]> {
    const whereString = this.makeSpecialWhereString(filters);
    const effectiveLimit = limit > 100 ? 100 : limit;

    if(filters.pagination) {
      const maxRows = await getRepository(Vehicle)
        .createQueryBuilder('v')
        .leftJoinAndMapOne('v.client', Client, 'c', 'v.client_id = c.id')
        .where(whereString)
        .getCount();

      const pages = Math.ceil(maxRows / effectiveLimit);
      const startIndex = (page - 1) * effectiveLimit;

      const dbPageData = await getRepository(Vehicle)
        .createQueryBuilder('v')
        .leftJoinAndMapOne('v.client', Client, 'c', 'v.client_id = c.id')
        .where(whereString)
        .orderBy('c.group', 'ASC')
        .addOrderBy('SUBSTRING(v.plate, 7)', 'ASC')
        .addOrderBy('c.name', 'ASC')
        .addOrderBy('v.plate', 'ASC')
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

    const dbData = await getRepository(Vehicle)
      .createQueryBuilder('v')
      .leftJoinAndMapOne('v.client', Client, 'c', 'v.client_id = c.id')
      .where(whereString)
      .orderBy('c.group')
      .addOrderBy('SUBSTRING(v.plate, 7)')
      .addOrderBy('c.name')
      .addOrderBy('v.plate')
      .getMany();

    return dbData;
  }

  async findById(id: string): Promise<Vehicle> {
    const dbData = await getRepository(Vehicle).findOne({ where: { id } });

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
    const oldData = await getRepository(Vehicle).findOne({ id });

    await getRepository(Vehicle).update(id, {
      client_id: data.client_id || oldData.client_id,
      plate: data.plate || oldData.plate,
      renavam: data.renavam || oldData.renavam,
      crv: data.crv || oldData.crv,
      brand_model: data.brand_model || oldData.brand_model,
      type: data.type || oldData.type,
      details: data.details || oldData.details,
      status: data.status || oldData.status,
      crlve_included: data.crlve_included || oldData.crlve_included,
    });

    const dbData = await getRepository(Vehicle).findOne({ where: { id } });
    return dbData;
  }

  async delete(id: string): Promise<void> {
    await getRepository(Vehicle).delete(id);
  }
}
