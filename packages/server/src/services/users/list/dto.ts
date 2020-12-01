import { RepoUsersListFilters } from '~/types';

export interface IUsersListRequestDTO {
  page: number;
  limit: number;
  filters: RepoUsersListFilters;
}
