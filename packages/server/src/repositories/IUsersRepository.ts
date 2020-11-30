import { User } from '~/entities/User';
import { WithPagination } from '~/interface';

export interface IUsersRepository {
  find(id: string, email: string): Promise<User>;

  list(page: number, limit: number, filters?: Pick<User, 'name'|'email'>): Promise<WithPagination<User>>;

  save(user: User): Promise<User>;
  update(id: string, data: Omit<User, 'id'>): Promise<User>;
  delete(id: string): Promise<void>;
}
