import { Client } from '~/entities/Client';

export interface IClientsListRequestDTO {
  page: number;
  limit: number;
  noPagination: string;
  filters: Omit<Client, 'id'|'createdAt'|'updatedAt'>;
}
