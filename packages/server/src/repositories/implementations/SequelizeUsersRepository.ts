import { IUser } from '~/entities/IUser';
import { User } from '~/entities/sequelize/User';
import { IPagination } from '~/interfaces';

import { IUsersRepository } from '../IUsersRepository';

export class SequelizeUsersRepository implements IUsersRepository {
  async list(page = 1, limit = 10, withPassword = false): Promise<IPagination<IUser>> {
    const effectiveLimit = limit > 100 ? 100 : limit;

    const maxRows = await User.count();
    const pages = Math.ceil(maxRows / effectiveLimit);
    const startIndex = (page - 1) * effectiveLimit;

    const dbPageData = await User.findAll({
      limit: effectiveLimit,
      offset: startIndex,
      order: [['name', 'ASC']],
      attributes: { exclude: withPassword ? undefined : ['password'] },
    });

    return {
      page: {
        total: pages,
        limit: effectiveLimit,
        current: page,
      },
      data: dbPageData,
    };
  }

  async findById(id: string, withPassword = false): Promise<IUser> {
    const dbData = await User.findByPk(id, {
      attributes: { exclude: withPassword ? undefined : ['password'] },
    });

    return dbData;
  }

  async findByEmail(email: string, withPassword = false): Promise<IUser> {
    const dbData = await User.findOne({
      where: { email },
      attributes: { exclude: withPassword ? undefined : ['password'] },
    });

    return dbData;
  }

  async create(data: Omit<IUser, 'id'|'createdAt'|'updatedAt'>, withPassword = false): Promise<IUser> {
    const dbData = await User.create(data);

    if(!withPassword) {
      dbData.password = undefined;
    }

    return dbData;
  }

  async update(id: string, data: Omit<IUser, 'id'|'createdAt'|'updatedAt'>, withPassword = false): Promise<IUser> {
    await User.update(data, { where: { id } });

    const dbData = await User.findByPk(id, {
      attributes: { exclude: withPassword ? undefined : ['password'] },
    });

    return dbData;
  }

  async delete(id: string): Promise<void> {
    await (await User.findByPk(id)).destroy();
  }
}
