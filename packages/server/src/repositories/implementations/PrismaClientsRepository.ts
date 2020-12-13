import { PrismaClient } from '@prisma/client';

import { Client } from '~/entities/Client';
import { RepoClientFindOrCreate, RepoClientsListFilters, RepoClientsSave, RepoClientsUpdate } from '~/types';

import { IClientsRepository } from '../IClientsRepository';

export class PrismaClientsRepository implements IClientsRepository {
  private prisma = new PrismaClient();

  async find(id: string): Promise<Client> {
    const data = await this.prisma.client.findUnique({ where: { id } });

    this.prisma.$disconnect();
    return data;
  }

  async findByDocument(document: string): Promise<Client> {
    const data = await this.prisma.client.findUnique({ where: { document } });

    this.prisma.$disconnect();
    return data;
  }

  async findOrCreate(client: RepoClientFindOrCreate): Promise<Client> {
    let data = await this.prisma.client.findUnique({ where: { document: client.document } });

    if(!data) {
      data = await this.prisma.client.create({ data: client });
    }

    this.prisma.$disconnect();
    return data;
  }

  async list(filters?: RepoClientsListFilters): Promise<Client[]> {
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

    this.prisma.$disconnect();
    return data;
  }

  async save(client: RepoClientsSave): Promise<Client> {
    const data = await this.prisma.client.create({ data: client });

    this.prisma.$disconnect();
    return data;
  }

  async update(id: string, client: RepoClientsUpdate): Promise<Client> {
    const data = await this.prisma.client.update({ where: { id }, data: client });

    this.prisma.$disconnect();
    return data;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.client.delete({ where: { id } });
    this.prisma.$disconnect();
  }
}
