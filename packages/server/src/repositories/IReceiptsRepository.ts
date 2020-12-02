import { Receipt } from '~/entities/Receipts';
import { IPagination } from '~/interface';
import { RepoReceiptsListFilters, RepoReceiptsSave, RepoReceiptsUpdate } from '~/types';

export interface IReceiptsRepository {
  find(clientId: string, vehicleId: string): Promise<Receipt>;
  list(page: number, limit: number, filters?: RepoReceiptsListFilters): Promise<IPagination<Receipt>>;
  save(receipt: RepoReceiptsSave): Promise<Receipt>;
  update(clientId: string, vehicleId: string, receipt: RepoReceiptsUpdate): Promise<Receipt>;
  delete(clientId: string, vehicleId: string): Promise<void>;
}
