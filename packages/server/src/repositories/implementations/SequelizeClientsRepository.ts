import { IClient, IPagination } from '@christino-sgi/common';
import { QueryTypes } from 'sequelize';
import { v4 } from 'uuid';

import { sequelize } from '~/config/sequelize';
import { Client } from '~/entities/sequelize/Client';
import { IClientsListFilters } from '~/interfaces';
import { sequelizeWhere } from '~/utils/sequelizeWhere';

import { IClientsRepository } from '../IClientsRepository';

export class SequelizeClientsRepository implements IClientsRepository {
  async list(page = 1, maxResults = 10, filters: IClientsListFilters): Promise<IPagination<IClient> | IClient[]> {
    const where = sequelizeWhere({ ...filters, pagination: undefined });
    const limit = maxResults > 100 ? 100 : maxResults;

    if(filters.pagination) {
      const maxRows = await Client.count();
      const pages = Math.ceil(maxRows / limit);
      const offset = (page - 1) * limit;

      const dbPageData = await Client.findAll({ limit, offset, order: [['name', 'ASC']], where });
      return {
        page: {
          total: pages || 1,
          limit,
          current: page,
        },
        data: dbPageData,
      };
    }

    const dbData = await Client.findAll({ order: [['name', 'ASC']], where });
    return dbData;
  }

  async listGroups(): Promise<string[]> {
    const dbData = await sequelize.query<Pick<IClient, 'group'>>('SELECT DISTINCT c.group FROM clients as c WHERE c.group IS NOT NULL ORDER BY c.group ASC', {
      type: QueryTypes.SELECT,
    });
    return dbData.map((el) => el.group);
  }

  async findById(id: string): Promise<IClient> {
    const dbData = await Client.findByPk(id);
    return dbData;
  }

  async findByDocument(document: string): Promise<IClient> {
    const dbData = await Client.findOne({ where: { document } });
    return dbData;
  }

  async create(data: Omit<IClient, 'id'|'createdAt'|'updatedAt'>): Promise<IClient> {
    const dbData = await Client.create({ ...data, id: v4() });
    return dbData;
  }

  async update(id: string, data: Omit<IClient, 'id'|'createdAt'|'updatedAt'>): Promise<IClient> {
    const dbData = await Client.findByPk(id);
    await dbData.update(data);
    return dbData;
  }

  async delete(id: string): Promise<void> {
    await (await Client.findByPk(id)).destroy();
  }
}
