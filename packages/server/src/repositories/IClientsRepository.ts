import { Client } from '~/entities/Client';
import { IClientsListFilters, IPagination } from '~/interfaces';

export interface IClientsRepository {
  list(page: number, limit: number, filters: IClientsListFilters): Promise<IPagination<Client> | Client[]>;
  listGroups(): Promise<string[]>;
  findById(id: string): Promise<Client>;
  findByDocument(document: string): Promise<Client>;

  create(data: Pick<Client, 'name'|'document'|'group'>): Promise<Client>;
  update(id: string, data: Pick<Client, 'name'|'document'|'group'>): Promise<Client>;

  delete(id: string): Promise<void>;
}
