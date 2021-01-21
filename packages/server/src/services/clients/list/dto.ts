import { IClientsListFilters } from '~/interfaces';

export interface IClientsListRequestDTO {
  page: number;
  limit: number;
  filters: IClientsListFilters;
}
