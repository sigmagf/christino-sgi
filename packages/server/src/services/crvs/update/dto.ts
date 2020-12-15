import { RepoCRVsUpdate } from '~/types';

export interface ICRVsUpdateRequestDTO {
  clientId: string;
  vehicleId: string;
  receipt: RepoCRVsUpdate;
}
