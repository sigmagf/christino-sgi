import { Client, Vehicle } from '@prisma/client';

import { Receipt } from '~/entities/Receipts';
import { IPagination } from '~/interface';
import { RepoReceiptsListFilters } from '~/types';

export interface IReceiptsRepository {
  find(vehicleId: string, clientId: string): Promise<Receipt>;
  list(page: number, limit: number, filters?: RepoReceiptsListFilters): Promise<IPagination<Receipt>>;
  save(receipt: Omit<Receipt, 'client'|'vehicle'>): Promise<Receipt>;
  update(id: string, receipt: Omit<Receipt, 'client'|'vehicle'>): Promise<Receipt>;
  delete(clientId: string, vehicleId: string): Promise<void>;
}
