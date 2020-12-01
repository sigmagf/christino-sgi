import { PrismaClient } from '@prisma/client';

import { Client } from '~/entities/Client';
import { IPagination } from '~/interface';
import { RepoClientFindOrCreate, RepoClientsListFilters } from '~/types';
import { withPagination } from '~/utils/withPagination';

import { IClientsRepository } from '../IClientsRepository';

export class PrismaClientsRepository implements IClientsRepository {
  private prisma = new PrismaClient();

  async find(id: string, document: string): Promise<Client> {
    const data = await this.prisma.client.findOne({ where: { id, document } });

    return data;
  }

  async findOrCreate(client: RepoClientFindOrCreate): Promise<Client> {
    let dbClient = await this.prisma.client.findOne({ where: { document: client.document } });

    if(!dbClient) {
      dbClient = await this.prisma.client.create({ data: client });
    }

    return dbClient;
  }

  async list(page = 1, limit = 10, filters?: RepoClientsListFilters): Promise<IPagination<Client>> {
    const data = await this.prisma.client.findMany({
      where: {
        AND: {
          name: { contains: filters.name },
          document: { contains: filters.document },
          group: { contains: filters.group },
        },
      },
      orderBy: { name: 'asc' },
    });

    return withPagination(data, page, limit);
  }

  async save(client: Client): Promise<Client> {
    const data = await this.prisma.client.create({ data: client });

    return data;
  }

  async update(id: string, client: Omit<Client, 'id'>): Promise<Client> {
    const data = await this.prisma.client.update({ where: { id }, data: client });

    return data;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.client.delete({ where: { id } });
  }
}
