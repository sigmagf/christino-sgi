import { Receipt } from '~/entities/Receipts';
import { IPagination } from '~/interface';

export type ReceiptsRepositoryListFilters = Omit<Receipt, 'id'|'createdAt'|'updatedAt'>

export interface IReceiptsRepository {
  find(id: string): Promise<Receipt>;
  list(page: number, limit: number, filters?: ReceiptsRepositoryListFilters): Promise<IPagination<Receipt>>;
  save(receipt: Receipt): Promise<Receipt>;
  update(id: string, receipt: Omit<Receipt, 'id'|'client'|'vehicle'>): Promise<Receipt>;
  delete(id: string): Promise<void>;
}
