import { getRepository } from 'typeorm';

import { Client } from '~/entities/Client';
import { IClientsListFilters, IPagination } from '~/interfaces';
import { createWhere } from '~/utils/createWhere';

import { IClientsRepository } from '../IClientsRepository';

export class TypeORMClientsRepository implements IClientsRepository {
  async list(page = 1, limit = 10, filters: IClientsListFilters): Promise<IPagination<Client> | Client[]> {
    const filtersString = createWhere({ ...filters, pagination: undefined });

    if(filters.pagination) {
      const pages = Math.ceil(await getRepository(Client).count({ where: filtersString }) / limit);
      const startIndex = (page - 1) * limit;

      const dbPageData = await getRepository(Client).find({ where: filtersString, skip: startIndex, take: limit });

      return {
        page: {
          total: pages < 1 ? 1 : pages,
          limit,
          current: page,
        },
        data: dbPageData,
      };
    }

    const dbData = await getRepository(Client).find({ where: filtersString });
    return dbData;
  }

  async findById(id: string): Promise<Client> {
    const dbData = await getRepository(Client).findOne({ where: { id }, order: { name: 'ASC' } });
    return dbData;
  }

  async findByDocument(document: string): Promise<Client> {
    const dbData = await getRepository(Client).findOne({ where: { document }, order: { name: 'ASC' } });
    return dbData;
  }

  async create(data: Pick<Client, 'name'|'document'|'group'>): Promise<Client> {
    await getRepository(Client).createQueryBuilder()
      .insert()
      .values(data)
      .onConflict('("document") DO NOTHING')
      .execute();

    const dbData = await getRepository(Client).findOne({ where: { document: data.document }, order: { name: 'ASC' } });
    return dbData;
  }

  async update(id: string, data: Pick<Client, 'name'|'document'|'group'>): Promise<Client> {
    await getRepository(Client).update(id, data);

    const dbData = await getRepository(Client).findOne({ where: { id } });
    return dbData;
  }

  async delete(id: string): Promise<void> {
    await getRepository(Client).delete(id);
  }
}
