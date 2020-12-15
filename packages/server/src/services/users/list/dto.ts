import { RepoUsersListFilters } from '~/types';

export interface IUsersListRequestDTO {
  page: number;
  limit: number;
  noPagination: string;
  filters: RepoUsersListFilters;
}
