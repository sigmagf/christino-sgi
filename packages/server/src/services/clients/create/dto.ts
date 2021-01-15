import { Client } from '~/entities/Client';

export type IClientsCreateRequestDTO = Omit<Client, 'id'|'createdAt'|'updatedAt'>;
