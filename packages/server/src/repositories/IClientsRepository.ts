import { Client } from '~/entities/Client';
import { IPagination } from '~/interface';

export interface IClientsRepository {
  list(page: number, limit: number): Promise<IPagination<Client>>;
  findById(id: string): Promise<Client>;
  findByDocument(document: string): Promise<Client>;
  findOrCreate(data: Pick<Client, 'name'|'document'|'group'>): Promise<Client>;

  create(data: Pick<Client, 'name'|'document'|'group'>): Promise<Client>;
  update(id: string, data: Pick<Client, 'name'|'document'|'group'>): Promise<Client>;

  delete(id: string): Promise<void>;
}
