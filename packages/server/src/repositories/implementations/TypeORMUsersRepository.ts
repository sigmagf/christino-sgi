import bcrypt from 'bcryptjs';
import { getRepository } from 'typeorm';

import { User } from '~/entities/User';
import { IPagination } from '~/interfaces';

import { IUsersRepository } from '../IUsersRepository';

export class TypeORMUsersRepository implements IUsersRepository {
  private async hashPassword(password: string) {
    if(!password) {
      return null;
    }

    const hash = await bcrypt.hash(password, 10);

    return hash;
  }

  async list(page: number, limit: number, pagination = true): Promise<IPagination<User> | User[]> {
    if(pagination) {
      const pages = Math.ceil((await getRepository(User).count()) / limit);
      const startIndex = (page - 1) * limit;

      const dbPageData = await getRepository(User).find({ order: { name: 'ASC' }, skip: startIndex, take: limit });

      return {
        page: {
          total: pages,
          limit,
          current: page,
        },
        data: dbPageData,
      };
    }

    const dbData = await getRepository(User).find({ order: { name: 'ASC' }, take: 100 });
    return dbData;
  }

  async findById(id: string): Promise<User> {
    const dbData = await getRepository(User).findOne({ where: { id } });

    return dbData;
  }

  async findByEmail(email: string): Promise<User> {
    const dbData = await getRepository(User).findOne({ where: { email } });

    return dbData;
  }

  async create(data: Pick<User, 'name' | 'email' | 'password'>): Promise<User> {
    const hashPAssword = await this.hashPassword(data.password);

    const dbData = await getRepository(User).save({
      name: data.name,
      email: data.email,
      password: hashPAssword,
    });

    return dbData;
  }

  async update(id: string, data: Pick<User, 'name' | 'email' | 'password'>): Promise<User> {
    const hashPAssword = await this.hashPassword(data.password);
    const oldData = await getRepository(User).findOne({ where: { id } });

    await getRepository(User).update(id, {
      name: data.name || oldData.name,
      email: data.email || oldData.email,
      password: hashPAssword || oldData.password,
    });

    const dbData = await getRepository(User).findOne({ where: { id } });
    return dbData;
  }

  async delete(id: string): Promise<void> {
    await getRepository(User).delete(id);
  }
}
