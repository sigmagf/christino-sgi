import { Client } from '~/entities/Client';
import { IPagination } from '~/interface';
import { RepoClientFindOrCreate, RepoClientsListFilters, RepoClientsSave, RepoClientsUpdate } from '~/types';

export interface IClientsRepository {
  find(id: string): Promise<Client>;
  findByDocument(document: string): Promise<Client>;
  findOrCreate(client: RepoClientFindOrCreate): Promise<Client>;
  list(page: number, limit: number, filters?: RepoClientsListFilters): Promise<IPagination<Client>>;
  save(client: RepoClientsSave): Promise<Client>;
  update(id: string, client: RepoClientsUpdate): Promise<Client>;
  delete(id: string): Promise<void>;
}
