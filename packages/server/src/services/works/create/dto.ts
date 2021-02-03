import { Work } from '~/entities/Work';
import { WorkExpense } from '~/entities/WorkExpense';
import { WorkRevenue } from '~/entities/WorkRevenue';

export interface IWorksCreateRequestDTO extends Pick<Work, 'service_id'|'identifier'|'value'|'details'|'status'> {
  name: string;
  document: string;
  group: string;
  history: string[];
  revenues: Pick<WorkRevenue, 'payment_method_id'|'value'|'effective_on'>[];
  expenses: Pick<WorkExpense, 'expense_type_id'|'value'|'effective_on'>[];
}
