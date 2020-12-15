import { User } from '~/entities/User';
import { RepoUsersListFilters, RepoUsersSave, RepoUsersUpdate } from '~/types';

export interface IUsersRepository {
  find(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  list(filters?: RepoUsersListFilters): Promise<User[]>;
  save(user: RepoUsersSave): Promise<User>;
  update(id: string, user: RepoUsersUpdate): Promise<User>;
  delete(id: string): Promise<void>;
}
