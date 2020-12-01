import { Receipt } from '~/entities/Receipts';
import { IPagination } from '~/interface';

export interface IReceiptsRepository {
  find(vehicleId: string, clientId: string): Promise<Receipt>;
  list(page: number, limit: number, filters?: Omit<Receipt, 'createdAt'|'updatedAt'>): Promise<IPagination<Receipt>>;
  save(receipt: Receipt): Promise<Receipt>;
  update(id: string, receipt: Omit<Receipt, 'client'|'vehicle'>): Promise<Receipt>;
  delete(clientId: string, vehicleId: string): Promise<void>;
}
