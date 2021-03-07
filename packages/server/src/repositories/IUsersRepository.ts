import { IPagination, IUser } from '@christino-sgi/common';

export interface IUsersRepository {
  list(page: number, maxResults: number, withPassword?: boolean): Promise<IPagination<IUser>>;
  findById(id: string, withPassword?: boolean): Promise<IUser>;
  findByEmail(email: string, withPassword?: boolean): Promise<IUser>;

  create(data: Omit<IUser, 'id'|'createdAt'|'updatedAt'>, withPassword?: boolean): Promise<IUser>;
  update(id: string, data: Omit<IUser, 'id'|'createdAt'|'updatedAt'>, withPassword?: boolean): Promise<IUser>;

  delete(id: string): Promise<void>;
}
