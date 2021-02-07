import { Work } from '~/entities/Work';
import { IPagination, IWorksListFilters } from '~/interfaces';

export interface IWorkCreateOrUpdate extends Pick<Work, 'client_id'|'service_id'|'identifier'|'value'|'details'|'status'> {
  history: string;
}

export interface IWorksRepository {
  list(page: number, limit: number, filters: IWorksListFilters): Promise<IPagination<Work> | Work[]>;
  findById(id: string): Promise<Work>;

  create(data: IWorkCreateOrUpdate): Promise<Work>;
  update(id: string, data: IWorkCreateOrUpdate): Promise<Work>;

  delete(id: string): Promise<void>;
}
