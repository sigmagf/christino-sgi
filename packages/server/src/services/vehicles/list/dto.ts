import { IVehiclesListFilters } from '~/interfaces';

export interface IVehiclesListRequestDTO {
  page: number;
  limit: number;
  filters: IVehiclesListFilters;
}
