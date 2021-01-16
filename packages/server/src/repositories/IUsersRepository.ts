import { User } from '~/entities/User';
import { IPagination } from '~/interface';

export interface IUsersRepository {
  list(page: number, limit: number): Promise<IPagination<User>>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;

  create(data: Pick<User, 'name'|'email'|'password'>): Promise<User>;
  update(id: string, data: Pick<User, 'name'|'email'|'password'>): Promise<User>;

  delete(id: string): Promise<void>;
}
