import { Client } from './entities/Client';
import { User } from './entities/User';
import { Vehicle } from './entities/Vehicle';

export type ReceiptStatus = 'ORIGINAL'|'XEROX'|'OUTRO'|'BAIXADO';

export type RepoClientFindOrCreate = Omit<Client, 'id'|'createdAt'|'updatedAt'>;
export type RepoVehicleFindOrCreate = Omit<Vehicle, 'id'|'createdAt'|'updatedAt'>;

export type RepoClientsListFilters = Pick<Client, 'name'|'document'|'group'>;
export type RepoVehicleListFilters = Pick<Vehicle, 'plate'|'renavam'|'brandModel'|'type'>;
export type RepoUsersListFilters = Pick<User, 'name'|'email'>
export type RepoReceiptsListFilters = {
  client: RepoClientFindOrCreate;
  vehicle: RepoVehicleFindOrCreate;
  details: string;
  issuedOn: Date;
  status: ReceiptStatus;
}
