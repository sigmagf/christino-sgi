import { Client } from '~/entities/Client';

export type IClientsUpdateRequestDTO = Pick<Client, 'id'|'name'|'document'|'group'>;
