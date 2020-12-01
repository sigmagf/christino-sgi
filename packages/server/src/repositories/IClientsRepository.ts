import { Client } from '~/entities/Client';
import { IPagination } from '~/interface';

export interface IClientsRepository {
  find(id: string, document: string): Promise<Client>;
  findOrCreate(client: Client): Promise<Client>;
  list(page: number, limit: number, filters?: Pick<Client, 'name'|'document'|'group'>): Promise<IPagination<Client>>;
  save(client: Client): Promise<Client>;
  update(id: string, data: Omit<Client, 'id'>): Promise<Client>;
  delete(id: string): Promise<void>;
}
