import { IWork } from '~/entities/IWork';
import { IPagination, IWorksListFilters } from '~/interfaces';

export interface IWorkCreateOrUpdate extends Pick<IWork, 'clientId'|'serviceId'|'identifier'|'value'|'details'|'status'> {
  history: string;
}

export interface IWorksRepository {
  list(page: number, limit: number, filters: IWorksListFilters): Promise<IPagination<IWork> | IWork[]>;
  findById(id: string): Promise<IWork>;

  create(data: IWorkCreateOrUpdate): Promise<IWork>;
  update(id: string, data: IWorkCreateOrUpdate): Promise<IWork>;

  delete(id: string): Promise<void>;
}
