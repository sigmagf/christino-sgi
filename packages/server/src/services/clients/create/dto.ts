import { Client } from '~/entities/Client';

export type IClientsCreateRequestDTO = Omit<Client, 'id'|'created_at'|'updated_at'>;
