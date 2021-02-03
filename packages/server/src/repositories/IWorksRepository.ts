import { Work } from '~/entities/Work';
import { WorkExpense } from '~/entities/WorkExpense';
import { WorkRevenue } from '~/entities/WorkRevenue';
import { IWorksListFilters, IPagination } from '~/interfaces';

export interface IWorkCreateOrUpdate extends Pick<Work, 'client_id'|'service_id'|'identifier'|'value'|'details'|'status'> {
  history: string[];
  revenues: Pick<WorkRevenue, 'payment_method_id'|'value'|'effective_on'>[];
  expenses: Pick<WorkExpense, 'expense_type_id'|'value'|'effective_on'>[];
}
export interface IWorksRepository {
  list(page: number, limit: number, filters: IWorksListFilters): Promise<IPagination<Work> | Work[]>;
  findById(id: string): Promise<Work>;

  create(data: IWorkCreateOrUpdate): Promise<Work>;
  update(id: string, data: IWorkCreateOrUpdate): Promise<Work>;

  delete(id: string): Promise<void>;
}
