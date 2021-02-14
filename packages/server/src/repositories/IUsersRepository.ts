import { IUser } from '~/entities/IUser';
import { IPagination } from '~/interfaces';

export interface IUsersRepository {
  list(page: number, limit: number): Promise<IPagination<IUser>>;
  findById(id: string): Promise<IUser>;
  findByEmail(email: string): Promise<IUser>;

  create(data: Omit<IUser, 'id'|'createdAt'|'updatedAt'>): Promise<IUser>;
  update(id: string, data: Omit<IUser, 'id'|'createdAt'|'updatedAt'>): Promise<IUser>;

  delete(id: string): Promise<void>;
}
