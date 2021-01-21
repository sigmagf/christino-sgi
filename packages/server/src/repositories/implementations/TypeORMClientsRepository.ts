import { getRepository, Like } from 'typeorm';

import { Client } from '~/entities/Client';
import { IClientsListFilters, IPagination } from '~/interfaces';

import { IClientsRepository } from '../IClientsRepository';

export class TypeORMClientsRepository implements IClientsRepository {
  async list(page = 1, limit = 10, filters: IClientsListFilters): Promise<IPagination<Client> | Client[]> {
    if(filters.pagination) {
      const maxClients = await getRepository(Client).count({
        where: {
          name: Like(`%${filters.name}%`),
          folder: Like(`%${filters.folder}%`),
        },
      });

      const pages = Math.ceil(maxClients / limit);
      const startIndex = (page - 1) * limit;

      const dbPageData = await getRepository(Client).find({
        where: {
          name: Like(`%${filters.name}%`),
          folder: Like(`%${filters.folder}%`),
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
        data: dbPageData,
      };
    }

    const dbData = await getRepository(Client).find({
      where: {
        name: Like(`%${filters.name}%`),
        folder: Like(`%${filters.folder}%`),
      },
      take: 100,
    });

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

  async create(data: Pick<Client, 'name'|'document'|'folder'>): Promise<Client> {
    await getRepository(Client).createQueryBuilder()
      .insert()
      .values(data)
      .onConflict('("document") DO NOTHING')
      .execute();

    const dbData = await getRepository(Client).findOne({ where: { document: data.document }, order: { name: 'ASC' } });
    return dbData;
  }

  async update(id: string, data: Pick<Client, 'name'|'document'|'folder'>): Promise<Client> {
    const oldData = await getRepository(Client).findOne({ where: { id } });

    await getRepository(Client).update(id, {
      name: data.name || oldData.name,
      document: data.document || oldData.document,
      folder: data.folder || oldData.folder,
    });

    const dbData = await getRepository(Client).findOne({ where: { id } });
    return dbData;
  }

  async delete(id: string): Promise<void> {
    await getRepository(Client).delete(id);
  }
}
