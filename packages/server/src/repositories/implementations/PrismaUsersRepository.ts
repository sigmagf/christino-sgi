import { PrismaClient } from '@prisma/client';

import { User } from '~/entities/User';
import { IPagination } from '~/interface';
import { withPagination } from '~/utils/withPagination';

import { IUsersRepository } from '../IUsersRepository';

export class PrismaUsersRepository implements IUsersRepository {
  private prisma = new PrismaClient();

  async find(id: string, email: string): Promise<User> {
    const data = await this.prisma.user.findOne({ where: { id, email } });

    return data;
  }

  async list(page = 1, limit = 10, filters?: Pick<User, 'name'|'email'>): Promise<IPagination<User>> {
    const data = await this.prisma.user.findMany({
      where: {
        AND: {
          name: { contains: filters.name },
          email: { contains: filters.email },
        },
      },
    });

    return withPagination(data, page, limit);
  }

  async save(user: User): Promise<User> {
    const data = await this.prisma.user.create({ data: user });

    return data;
  }

  async update(id: string, user: Omit<User, 'id'>): Promise<User> {
    const data = await this.prisma.user.update({ where: { id }, data: user });

    return data;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
