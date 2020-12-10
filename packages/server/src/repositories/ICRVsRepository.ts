import { Crv } from '~/entities/CRV';
import { IPagination } from '~/interface';
import { RepoCRVsListFilters, RepoCRVsSave, RepoCRVsUpdate } from '~/types';

export interface ICRVsRepository {
  find(clientId: string, vehicleId: string): Promise<Crv>;
  list(page: number, limit: number, filters?: RepoCRVsListFilters): Promise<IPagination<Crv>>;
  save(receipt: RepoCRVsSave): Promise<Crv>;
  update(clientId: string, vehicleId: string, receipt: RepoCRVsUpdate): Promise<Crv>;
  delete(clientId: string, vehicleId: string): Promise<void>;
}
