import { Crv } from '~/entities/CRV';
import { IPagination } from '~/interface';
import { RepoReceiptsListFilters, RepoReceiptsSave, RepoReceiptsUpdate } from '~/types';

export interface ICRVsRepository {
  find(clientId: string, vehicleId: string): Promise<Crv>;
  list(page: number, limit: number, filters?: RepoReceiptsListFilters): Promise<IPagination<Crv>>;
  save(receipt: RepoReceiptsSave): Promise<Crv>;
  update(clientId: string, vehicleId: string, receipt: RepoReceiptsUpdate): Promise<Crv>;
  delete(clientId: string, vehicleId: string): Promise<void>;
}
