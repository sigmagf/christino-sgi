import { Client } from '~/entities/Client';

export type IClientsUpdateRequestDTO = Omit<Client, 'created_at'|'updated_at'>;
