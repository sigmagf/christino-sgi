import { RepoVehiclesListFilters } from '~/types';

export interface IVehiclesListRequestDTO {
  page: number;
  limit: number;
  filters: RepoVehiclesListFilters;
}
