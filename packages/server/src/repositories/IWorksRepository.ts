import { Work } from '~/entities/Work';
import { IWorksListFilters, IPagination } from '~/interfaces';

export interface IWorksRepository {
  list(page: number, limit: number, filters: IWorksListFilters): Promise<IPagination<Work> | Work[]>;
  findById(id: string): Promise<Work>;

  create(data: Omit<Work, 'id'|'client'|'service'|'created_at'|'updated_at'>): Promise<Work>;
  update(id: string, data: Omit<Work, 'id'|'client'|'service'|'created_at'|'updated_at'>): Promise<Work>;

  delete(id: string): Promise<void>;
}
