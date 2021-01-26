import { getRepository } from 'typeorm';

import { Client } from '~/entities/Client';
import { IClientsListFilters, IPagination } from '~/interfaces';
import { makeWhereString } from '~/utils/makeWhereString';

import { IClientsRepository } from '../IClientsRepository';

export class TypeORMClientsRepository implements IClientsRepository {
  async list(page = 1, limit = 10, filters: IClientsListFilters): Promise<IPagination<Client> | Client[]> {
    const filtersString = makeWhereString({ ...filters, pagination: undefined });
    const effectiveLimit = limit > 100 ? 100 : limit;

    if(filters.pagination) {
      const maxRows = await getRepository(Client)
        .createQueryBuilder()
        .where(filtersString)
        .getCount();

      const pages = Math.ceil(maxRows / effectiveLimit);
      const startIndex = (page - 1) * effectiveLimit;

      const dbPageData = await getRepository(Client)
        .createQueryBuilder()
        .where(filtersString)
        .skip(startIndex)
        .limit(effectiveLimit)
        .orderBy('name', 'ASC')
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

    const dbData = await getRepository(Client)
      .createQueryBuilder()
      .where(filtersString)
      .orderBy('name', 'ASC')
      .getMany();

    return dbData;
  }

  async listGroups(): Promise<string[]> {
    const dbData = await getRepository(Client).createQueryBuilder('c')
      .distinct(true)
      .select('c.group')
      .where('c.group IS NOT NULL')
      .orderBy('c.group', 'ASC')
      .getRawMany();

    return dbData.map((client) => client.c_group);
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
