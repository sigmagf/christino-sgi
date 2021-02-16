import { IClient } from '~/entities/IClient';
import { IClientsListFilters, IPagination } from '~/interfaces';

export interface IClientsRepository {
  list(page: number, maxResults: number, filters: IClientsListFilters): Promise<IPagination<IClient> | IClient[]>;
  listGroups(): Promise<string[]>;
  findById(id: string): Promise<IClient>;
  findByDocument(document: string): Promise<IClient>;

  create(data: Omit<IClient, 'id'|'createdAt'|'updatedAt'>): Promise<IClient>;
  update(id: string, data: Omit<IClient, 'id'|'createdAt'|'updatedAt'>): Promise<IClient>;

  delete(id: string): Promise<void>;
}
