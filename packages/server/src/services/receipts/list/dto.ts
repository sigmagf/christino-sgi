import { RepoReceiptsListFilters } from '~/types';

export interface IReceiptsListRequestDTO {
  page: number;
  limit: number;
  filters: RepoReceiptsListFilters;
}
