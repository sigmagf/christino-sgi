import { User } from '~/entities/User';
import { IPagination } from '~/interface';
import { RepoUsersListFilters } from '~/types';

export interface IUsersRepository {
  find(id: string, email: string): Promise<User>;
  list(page: number, limit: number, filters?: RepoUsersListFilters): Promise<IPagination<User>>;
  save(user: User): Promise<User>;
  update(id: string, user: Omit<User, 'id'>): Promise<User>;
  delete(id: string): Promise<void>;
}
