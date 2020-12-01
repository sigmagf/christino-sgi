import { Client } from '~/entities/Client';
import { IPagination } from '~/interface';
import { RepoClientFindOrCreate, RepoClientsListFilters } from '~/types';

export interface IClientsRepository {
  find(id: string, document: string): Promise<Client>;
  findOrCreate(client: RepoClientFindOrCreate): Promise<Client>;
  list(page: number, limit: number, filters?: RepoClientsListFilters): Promise<IPagination<Client>>;
  save(client: Client): Promise<Client>;
  update(id: string, data: Omit<Client, 'id'>): Promise<Client>;
  delete(id: string): Promise<void>;
}
