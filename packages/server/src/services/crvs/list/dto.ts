import { RepoCRVsListFilters } from '~/types';

export interface ICRVsListRequestDTO {
  page: number;
  limit: number;
  filters: RepoCRVsListFilters & {
    licensingMonth: number;
  };
}
