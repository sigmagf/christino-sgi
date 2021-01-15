import { Client } from '~/entities/Client';

export interface IClientsUpdateRequestDTO {
  id: string;
  client: Omit<Client, 'id'|'createdAt'|'updatedAt'>;
}
