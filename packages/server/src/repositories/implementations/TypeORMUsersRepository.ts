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

  async list(page = 1, limit = 10): Promise<IPagination<User>> {
    const effectiveLimit = limit > 100 ? 100 : limit;

    const pages = Math.ceil((await getRepository(User).count()) / effectiveLimit);
    const startIndex = (page - 1) * effectiveLimit;

    const dbPageData = await getRepository(User).find({ order: { name: 'ASC' }, skip: startIndex, take: effectiveLimit });

    return {
      page: {
        total: pages,
        limit: effectiveLimit,
        current: page,
      },
      data: dbPageData,
    };
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
    const hashPAssword = data.password ? await this.hashPassword(data.password) : undefined;

    await getRepository(User).update(id, {
      ...data,
      password: hashPAssword,
    });

    const dbData = await getRepository(User).findOne({ where: { id } });
    return dbData;
  }

  async delete(id: string): Promise<void> {
    await getRepository(User).delete(id);
  }
}
