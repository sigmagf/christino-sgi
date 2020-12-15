import { Client } from '~/entities/Client';
import { RepoClientFindOrCreate, RepoClientsListFilters, RepoClientsSave, RepoClientsUpdate } from '~/types';

export interface IClientsRepository {
  find(id: string): Promise<Client>;
  findByDocument(document: string): Promise<Client>;
  findOrCreate(client: RepoClientFindOrCreate): Promise<Client>;
  list(filters?: RepoClientsListFilters): Promise<Client[]>;
  save(client: RepoClientsSave): Promise<Client>;
  update(id: string, client: RepoClientsUpdate): Promise<Client>;
  delete(id: string): Promise<void>;
}
