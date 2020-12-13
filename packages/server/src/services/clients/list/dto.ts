import { RepoClientsListFilters } from '~/types';

export interface IClientsListRequestDTO {
  page: number;
  limit: number;
  noPagination: string;
  filters: RepoClientsListFilters;
}
