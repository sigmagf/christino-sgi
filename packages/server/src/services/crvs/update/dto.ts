import { RepoReceiptsUpdate } from '~/types';

export interface IReceiptsUpdateRequestDTO {
  clientId: string;
  vehicleId: string;
  receipt: RepoReceiptsUpdate;
}
