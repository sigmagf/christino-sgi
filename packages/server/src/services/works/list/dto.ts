import { IWorksListFilters } from '~/interfaces';

export interface IWorksListRequestDTO {
  page: number;
  limit: number;
  filters: IWorksListFilters;
}
