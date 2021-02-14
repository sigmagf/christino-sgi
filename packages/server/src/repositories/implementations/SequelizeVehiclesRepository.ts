import { QueryTypes } from 'sequelize';

import { sequelize } from '~/config/sequelize';
import { IVehicle } from '~/entities/IVehicle';
import { Vehicle } from '~/entities/sequelize/Vehicle';
import { IPagination, IVehiclesListFilters } from '~/interfaces';

import { IVehiclesRepository } from '../IVehiclesRepository';

export class SequelizeVehiclesRepository implements IVehiclesRepository {
  private selectQuery(where?: string, limit?: number, offset?: number) {
    return `
      SELECT
      v.id as v_id, v.plate as v_plate, v.renavam as v_renavam, v.crv as v_crv, v.brand_model as v_brand_model, v.type as v_type,
      v.details as v_details, v.status as v_status, v.crlve_included as v_crlve_included, v.created_at as v_created_at, v.updated_at as v_updated_at,
      c.id as c_id, c.name as c_name, c.document as c_document, c.group as c_group, c.email as c_email, c.phone1 as c_phone1, c.phone2 as c_phone2,
      c.created_at as c_created_at, c.updated_at as c_updated_at
      FROM vehicles as v LEFT JOIN clients as c ON v.client_id = c.id
      ${where ? `WHERE ${where}` : ''}
      ORDER BY c.group ASC, SUBSTRING(v.plate, 7) ASC, c.name ASC, v.plate ASC
      ${offset ? `OFFSET ${offset}` : ''}
      ${limit ? `LIMIT ${limit}` : ''}
    `;
  }

  private makeSpecialWhereString(filters: IVehiclesListFilters): string {
    const filtersPart: string[] = [];

    filtersPart.push(filters.clientId ? `c.id = '${filters.clientId}'` : null);

    if(filters.group === '-1') {
      filtersPart.push('c.group IS NULL');
    } else {
      filtersPart.push(filters.group ? `c.group LIKE '%${filters.group}%'` : null);
    }

    filtersPart.push(filters.plate ? `v.plate LIKE '%${filters.plate}%'` : null);
    filtersPart.push(filters.renavam ? `v.renavam LIKE '%${filters.renavam}%'` : null);
    filtersPart.push(filters.crv ? `v.crv LIKE '%${filters.crv}%'` : null);
    filtersPart.push(filters.brandModel ? `v.brand_model LIKE '%${filters.brandModel}%'` : null);

    if(Array.isArray(filters.status)) {
      const statusPart: string[] = [];
      filters.status.forEach((el) => statusPart.push(el ? `v.status = ${el}` : null));
      filtersPart.push(`(${statusPart.filter((el) => el !== null).join(' OR ')})`);
    } else {
      filtersPart.push(filters.status ? `v.status = ${filters.status}` : null);
    }

    filtersPart.push(filters.plateEnd ? `v.plate LIKE '%${filters.plateEnd}'` : null);

    switch(filters.includeTruck) {
      case '0':
        filtersPart.push('(v.type <> \'CAMINHAO\' AND v.type <> \'C. TRATOR\')');
        break;
      case '2':
        filtersPart.push('(v.type = \'CAMINHAO\' OR v.type = \'C. TRATOR\')');
        break;
      default:
      case '1':
        filtersPart.push(null);
        break;
    }

    return filtersPart.filter((el) => el !== null).join(' AND ');
  }

  private fixData(entry: any): IVehicle | IVehicle[] {
    if(!entry) {
      return null;
    }

    if(Array.isArray(entry)) {
      return entry.map((el) => ({
        id: el.v_id,
        clientId: el.c_id,
        client: {
          id: el.c_id,
          name: el.c_name,
          document: el.c_document,
          group: el.c_group,
          email: el.c_email,
          phone1: el.c_phone1,
          phone2: el.c_phone2,
          createdAt: el.c_created_at,
          updatedAt: el.c_updated_at,
        },
        plate: el.v_plate,
        renavam: el.v_renavam,
        crv: el.v_crv,
        brandModel: el.v_brand_model,
        type: el.v_type,
        details: el.v_details,
        status: el.v_status,
        crlveIncluded: el.v_crlve_included,
        createdAt: el.v_created_at,
        updatedAt: el.v_updated_at,
      }));
    }

    return {
      id: entry.v_id,
      clientId: entry.c_id,
      client: {
        id: entry.c_id,
        name: entry.c_name,
        document: entry.c_document,
        group: entry.c_group,
        email: entry.c_email,
        phone1: entry.c_phone1,
        phone2: entry.c_phone2,
        createdAt: entry.c_created_at,
        updatedAt: entry.c_updated_at,
      },
      plate: entry.v_plate,
      renavam: entry.v_renavam,
      crv: entry.v_crv,
      brandModel: entry.v_brand_model,
      type: entry.v_type,
      details: entry.v_details,
      status: entry.v_status,
      crlveIncluded: entry.v_crlve_included,
      createdAt: entry.v_created_at,
      updatedAt: entry.v_updated_at,
    };
  }

  async list(page = 1, limit = 10, filters: IVehiclesListFilters): Promise<IPagination<IVehicle> | IVehicle[]> {
    const whereString = this.makeSpecialWhereString(filters);
    const effectiveLimit = limit > 100 ? 100 : limit;

    if(filters.pagination) {
      const maxRows = await Vehicle.count();
      const pages = Math.ceil(maxRows / effectiveLimit);
      const offset = (page - 1) * effectiveLimit;
      const dbPageData = await sequelize.query(this.selectQuery(whereString, effectiveLimit, offset), { type: QueryTypes.SELECT });

      return {
        page: {
          total: pages < 1 ? 1 : pages,
          limit: effectiveLimit,
          current: page,
        },
        data: this.fixData(dbPageData) as IVehicle[],
      };
    }

    const dbData = await sequelize.query(this.selectQuery(whereString), { type: QueryTypes.SELECT });
    return this.fixData(dbData) as IVehicle[];
  }

  async findById(id: string): Promise<IVehicle> {
    const dbData = await sequelize.query(this.selectQuery(`v.id = '${id}'`), { type: QueryTypes.SELECT });
    return this.fixData(dbData[0]) as IVehicle;
  }

  async findByClientPlate(clientId: string, plate: string): Promise<IVehicle> {
    const dbData = await sequelize.query(this.selectQuery(`c.id = '${clientId}' AND v.plate ='${plate}'`), { type: QueryTypes.SELECT });
    return this.fixData(dbData[0]) as IVehicle;
  }

  async findByClientRenavam(clientId: string, renavam: string): Promise<IVehicle> {
    const dbData = await sequelize.query(this.selectQuery(`c.id = '${clientId}' AND v.renavam ='${renavam}'`), { type: QueryTypes.SELECT });
    return this.fixData(dbData[0]) as IVehicle;
  }

  async create(data: Omit<Vehicle, 'id'|'created_at'|'updated_at'>): Promise<IVehicle> {
    const entry = await Vehicle.create(data);

    const dbData = await sequelize.query(this.selectQuery(`v.id = '${entry.id}'`), { type: QueryTypes.SELECT });
    return this.fixData(dbData) as IVehicle;
  }

  async update(id: string, data: Omit<Vehicle, 'id'|'createdAt'|'updatedAt'>): Promise<IVehicle> {
    await Vehicle.update(data, { where: { id } });

    const dbData = await sequelize.query(this.selectQuery(`v.id = '${id}'`), { type: QueryTypes.SELECT });

    return this.fixData(dbData) as IVehicle;
  }

  async delete(id: string): Promise<void> {
    await (await Vehicle.findByPk(id)).destroy();
  }
}
