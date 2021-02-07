import bcrypt from 'bcryptjs';
import { getRepository } from 'typeorm';
import { v4 } from 'uuid';

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

  async create(data: Omit<User, 'id'|'created_at'|'updated_at'>): Promise<User> {
    const hashPAssword = await this.hashPassword(data.password);

    const dbData = await getRepository(User).save({
      ...data,
      id: v4(),
      password: hashPAssword,
    });

    return dbData;
  }

  async update(id: string, data: Omit<User, 'id'|'created_at'|'updated_at'>): Promise<User> {
    const hashPAssword = data.password ? await this.hashPassword(data.password) : undefined;

    const oldData = await getRepository(User).findOne({ id });

    await getRepository(User).update(id, {
      name: data.name || oldData.name,
      email: data.email || oldData.email,
      password: hashPAssword || oldData.password,
      pwd_reset_token: data.pwd_reset_token || oldData.pwd_reset_token,
      pwd_reset_expires: data.pwd_reset_expires || oldData.pwd_reset_expires,
      email_change_token: data.email_change_token || oldData.email_change_token,
      email_change_expires: data.email_change_expires || oldData.email_change_expires,
      desp_permission: data.desp_permission || oldData.desp_permission,
      segu_permission: data.segu_permission || oldData.segu_permission,
      work_permission: data.work_permission || oldData.work_permission,
    });

    const dbData = await getRepository(User).findOne({ where: { id } });
    return dbData;
  }

  async delete(id: string): Promise<void> {
    await getRepository(User).delete(id);
  }
}
