import { Client } from '~/entities/Client';
import { IClientsListFilters, IPagination } from '~/interfaces';

export interface IClientsRepository {
  list(page: number, limit: number, filters: IClientsListFilters): Promise<IPagination<Client> | Client[]>;
  listGroups(): Promise<string[]>;
  findById(id: string): Promise<Client>;
  findByDocument(document: string): Promise<Client>;

  create(data: Omit<Client, 'id'|'created_at'|'updated_at'>): Promise<Client>;
  update(id: string, data: Omit<Client, 'id'|'created_at'|'updated_at'>): Promise<Client>;

  delete(id: string): Promise<void>;
}
