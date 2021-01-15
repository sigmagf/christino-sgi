import { Client } from '~/entities/Client';

export interface IClientsRepository {
  find(id: string): Promise<Client>;
  findByDocument(document: string): Promise<Client>;
  findOrCreate(client: Omit<Client, 'id'|'createdAt'|'updatedAt'>): Promise<Client>;
  list(filters?: Omit<Client, 'id'|'createdAt'|'updatedAt'>): Promise<Client[]>;
  save(client: Omit<Client, 'id'|'createdAt'|'updatedAt'>): Promise<Client>;
  update(id: string, client: Omit<Client, 'id'|'createdAt'|'updatedAt'>): Promise<Client>;
  delete(id: string): Promise<void>;
}
