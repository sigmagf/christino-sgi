import { getRepository } from 'typeorm';

import { Client } from '~/entities/Client';
import { IPagination } from '~/interfaces';

import { IClientsRepository } from '../IClientsRepository';

export class TypeORMClientsRepository implements IClientsRepository {
  async list(page: number, limit: number, pagination = true): Promise<IPagination<Client> | Client[]> {
    if(pagination) {
      const pages = Math.ceil((await getRepository(Client).count()) / limit);
      const startIndex = (page - 1) * limit;

      const dbPageData = await getRepository(Client).find({ order: { name: 'ASC' }, skip: startIndex, take: limit });

      return {
        page: {
          total: pages,
          limit,
          current: page,
        },
        data: dbPageData,
      };
    }

    const dbData = await getRepository(Client).find({ order: { name: 'ASC' }, take: 100 });
    return dbData;
  }

  async findById(id: string): Promise<Client> {
    const dbData = await getRepository(Client).findOne({ where: { id } });

    return dbData;
  }

  async findByDocument(document: string): Promise<Client> {
    const dbData = await getRepository(Client).findOne({ where: { document } });

    return dbData;
  }

  async findOrCreate(data: Pick<Client, 'name'|'document'|'group'>): Promise<Client> {
    await getRepository(Client).createQueryBuilder()
      .insert()
      .values(data)
      .onConflict('("document") DO NOTHING')
      .execute();

    const dbData = await getRepository(Client).findOne({ where: { document: data.document } });

    return dbData;
  }

  async create(data: Pick<Client, 'name'|'document'|'group'>): Promise<Client> {
    const dbData = await getRepository(Client).save(data);

    return dbData;
  }

  async update(id: string, data: Pick<Client, 'name'|'document'|'group'>): Promise<Client> {
    const oldData = await getRepository(Client).findOne({ where: { id } });

    await getRepository(Client).update(id, {
      name: data.name || oldData.name,
      document: data.document || oldData.document,
      group: data.group || oldData.group,
    });

    const dbData = await getRepository(Client).findOne({ where: { id } });
    return dbData;
  }

  async delete(id: string): Promise<void> {
    await getRepository(Client).delete(id);
  }
}
