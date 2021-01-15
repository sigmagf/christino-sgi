import { User } from '~/entities/User';
import { RepoUsersListFilters, RepoUsersSave, RepoUsersUpdate } from '~/types';

export interface IUsersRepository {
  find(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  list(filters?: Pick<User, 'name'|'email'>): Promise<User[]>;
  save(user: Omit<User, 'id'|'createdAt'|'updatedAt'>): Promise<User>;
  update(id: string, user: Omit<User, 'id'|'createdAt'|'updatedAt'>): Promise<User>;
  delete(id: string): Promise<void>;
}
