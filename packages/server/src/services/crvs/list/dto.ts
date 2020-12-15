import { RepoCRVsListFilters } from '~/types';

export interface ICRVsListRequestDTO {
  page: number;
  limit: number;
  noPagination: string;
  filters: RepoCRVsListFilters & {
    licensingMonth: number;
  };
}
