import { Client } from '~/entities/Client';

export type IClientsCreateRequestDTO = Pick<Client, 'name'|'document'|'group'>;
