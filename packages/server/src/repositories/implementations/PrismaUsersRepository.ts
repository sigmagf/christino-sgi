import { PrismaClient } from '@prisma/client';

import { User } from '~/entities/User';
import { RepoUsersListFilters, RepoUsersSave, RepoUsersUpdate } from '~/types';

import { IUsersRepository } from '../IUsersRepository';

export class PrismaUsersRepository implements IUsersRepository {
  private prisma = new PrismaClient();

  async find(id: string): Promise<User> {
    const data = await this.prisma.user.findUnique({ where: { id } });

    this.prisma.$disconnect();
    return data;
  }

  async findByEmail(email: string): Promise<User> {
    const data = await this.prisma.user.findUnique({ where: { email } });

    this.prisma.$disconnect();
    return data;
  }

  async list(filters?: RepoUsersListFilters): Promise<User[]> {
    const data = await this.prisma.user.findMany({
      where: {
        AND: {
          name: { contains: filters.name },
          email: { contains: filters.email },
        },
      },
      orderBy: { name: 'asc' },
    });

    this.prisma.$disconnect();
    return data;
  }

  async save(user: RepoUsersSave): Promise<User> {
    const data = await this.prisma.user.create({ data: user });

    this.prisma.$disconnect();
    return data;
  }

  async update(id: string, user: RepoUsersUpdate): Promise<User> {
    const data = await this.prisma.user.update({ where: { id }, data: user });

    this.prisma.$disconnect();
    return data;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
    this.prisma.$disconnect();
  }
}
