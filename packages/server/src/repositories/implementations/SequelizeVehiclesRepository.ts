import { QueryTypes } from 'sequelize';
import { v4 } from 'uuid';

import { sequelize } from '~/config/sequelize';
import { IVehicle } from '~/entities/IVehicle';
import { Vehicle } from '~/entities/sequelize/Vehicle';
import { IPagination, IVehiclesListFilters } from '~/interfaces';

import { IVehiclesRepository } from '../IVehiclesRepository';

export class SequelizeVehiclesRepository implements IVehiclesRepository {
  private selectQuery(where?: string, limit?: number, offset?: number) {
    return `
      SELECT
      v.id as "vehicleId",
      v.plate as "vehiclePlate",
      v.renavam as "vehicleRenavam",
      v.crv as "vehicleCrv",
      v.brand_model as "vehicleBrandModel",
      v.type as "vehicleType",
      v.details as "vehicleDetails",
      v.status as "vehicleStatus",
      v.crlve_included as "vehicleCrlveIncluded",
      v.created_at as "vehicleCreatedAt",
      v.updated_at as "vehicleUpdatedAt",

      c.id as "clientId",
      c.name as "clientName",
      c.document as "clientDocument",
      c.group as "clientGroup",
      c.email as "clientEmail",
      c.phone1 as "clientPhone1",
      c.phone2 as "clientPhone2",
      c.created_at as "clientCreatedAt",
      c.updated_at as "clientUpdatedAt"

      FROM vehicles as v
      LEFT JOIN clients as c ON v.client_id = c.id
      ${where ? `WHERE ${where}` : ''}
      ORDER BY c.group ASC, SUBSTRING(v.plate, 7) ASC, c.name ASC, v.plate ASC
      ${offset ? `OFFSET ${offset}` : ''}
      ${limit ? `LIMIT ${limit}` : ''}
    `;
  }

  private fixData(entry: any[]): IVehicle[] {
    if(!entry) {
      return null;
    }

    return entry.map((el) => ({
      id: el.vehicleId,
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
      plate: el.vehiclePlate,
      renavam: el.vehicleRenavam,
      crv: el.vehicleCrv,
      brandModel: el.vehicleBrandModel,
      type: el.vehicleType,
      details: el.vehicleDetails,
      status: el.vehicleStatus,
      crlveIncluded: el.vehicleCrlveIncluded,
      createdAt: el.vehicleCreatedAt,
      updatedAt: el.vehicleUpdatedAt,
    }));
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
        filtersPart.push(null);
        break;
    }

    return filtersPart.filter((el) => el !== null).join(' AND ');
  }

  async list(page = 1, maxResults = 10, filters: IVehiclesListFilters): Promise<IPagination<IVehicle> | IVehicle[]> {
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
        data: this.fixData(dbPageData),
      };
    }

    const dbData = await sequelize.query(this.selectQuery(where), { type: QueryTypes.SELECT });
    return this.fixData(dbData);
  }

  async findById(id: string): Promise<IVehicle> {
    const dbData = await Vehicle.findByPk(id, { include: { all: true } });
    return dbData;
  }

  async findByClientPlate(clientId: string, plate: string): Promise<IVehicle> {
    const dbData = await Vehicle.findOne({ where: { clientId, plate }, include: { all: true } });
    return dbData;
  }

  async findByClientRenavam(clientId: string, renavam: string): Promise<IVehicle> {
    const dbData = await Vehicle.findOne({ where: { clientId, renavam }, include: { all: true } });
    return dbData;
  }

  async create(data: Omit<IVehicle, 'id'|'createdAt'|'updatedAt'>): Promise<IVehicle> {
    const entry = await Vehicle.create({ ...data, id: v4() });

    const dbData = await Vehicle.findByPk(entry.id, { include: { all: true } });
    return dbData;
  }

  async update(id: string, data: Omit<IVehicle, 'id'|'createdAt'|'updatedAt'>): Promise<IVehicle> {
    await Vehicle.update(data, { where: { id } });

    const dbData = await Vehicle.findByPk(id, { include: { all: true } });
    return dbData;
  }

  async delete(id: string): Promise<void> {
    await (await Vehicle.findByPk(id)).destroy();
  }
}
