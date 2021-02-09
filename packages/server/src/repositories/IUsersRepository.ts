import { User } from '~/entities/User';

import { IPagination } from '~/interfaces';

export interface IUsersRepository {
  list(page: number, limit: number): Promise<IPagination<User>>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;

  create(data: Omit<User, 'id'|'created_at'|'updated_at'>): Promise<User>;
  update(id: string, data: Omit<User, 'id'|'created_at'|'updated_at'>): Promise<User>;

  delete(id: string): Promise<void>;
}
