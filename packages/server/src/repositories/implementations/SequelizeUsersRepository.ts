import { IPagination, IUser } from '@christino-sgi/common';
import bcrypt from 'bcryptjs';
import { v4 } from 'uuid';

import { User } from '~/entities/sequelize/User';

import { IUsersRepository } from '../IUsersRepository';

export class SequelizeUsersRepository implements IUsersRepository {
  private async cryptPassword(password: string) {
    if(password) {
      console.log(password);
      const hash = await bcrypt.hash(password, 10);
      console.log(hash);
      return hash;
    }

    return undefined;
  }

  async list(page = 1, maxResults = 10, withPassword = false): Promise<IPagination<IUser>> {
    const limit = maxResults > 100 ? 100 : maxResults;

    const maxRows = await User.count();
    const pages = Math.ceil(maxRows / limit);
    const offset = (page - 1) * limit;

    const dbPageData = await User.findAll({
      limit,
      offset,
      order: [['name', 'ASC']],
      attributes: { exclude: withPassword ? undefined : ['password', 'pwdResetToken', 'pwdResetExpires'] },
    });

    return {
      page: {
        total: pages || 1,
        limit,
        current: page,
      },
      data: dbPageData,
    };
  }

  async findById(id: string, withPassword = false): Promise<IUser> {
    const dbData = await User.findByPk(id, {
      attributes: { exclude: withPassword ? undefined : ['password', 'pwdResetToken', 'pwdResetExpires'] },
    });

    return dbData;
  }

  async findByEmail(email: string, withPassword = false): Promise<IUser> {
    const dbData = await User.findOne({
      where: { email },
      attributes: { exclude: withPassword ? undefined : ['password', 'pwdResetToken', 'pwdResetExpires'] },
    });

    return dbData;
  }

  async create(data: Omit<IUser, 'id'|'createdAt'|'updatedAt'>, withPassword = false): Promise<IUser> {
    const password = await this.cryptPassword(data.password);
    const dbData = await User.create({ ...data, password, id: v4() });

    if(!withPassword) {
      dbData.password = undefined;
      dbData.pwdResetExpires = undefined;
      dbData.pwdResetToken = undefined;
    }

    return dbData;
  }

  async update(id: string, data: Omit<IUser, 'id'|'createdAt'|'updatedAt'>, withPassword = false): Promise<IUser> {
    const password = await this.cryptPassword(data.password);
    const dbData = await User.findByPk(id);
    await dbData.update({ ...data, password });

    if(!withPassword) {
      dbData.password = undefined;
      dbData.pwdResetExpires = undefined;
      dbData.pwdResetToken = undefined;
    }

    return dbData;
  }

  async delete(id: string): Promise<void> {
    await (await User.findByPk(id)).destroy();
  }
}
