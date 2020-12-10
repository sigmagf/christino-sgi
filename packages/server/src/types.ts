import { Client } from './entities/Client';
import { Crv } from './entities/CRV';
import { User } from './entities/User';
import { Vehicle } from './entities/Vehicle';

/* REPOSITORY CLIENTS */
export type RepoClientFindOrCreate = Omit<Client, 'id'|'createdAt'|'updatedAt'>;
export type RepoClientsListFilters = Omit<Client, 'id'|'createdAt'|'updatedAt'>;
export type RepoClientsSave = Omit<Client, 'id'|'createdAt'|'updatedAt'>;
export type RepoClientsUpdate = Omit<Client, 'id'|'createdAt'|'updatedAt'>;

/* REPOSITORY RECEIPTS */
export type RepoReceiptsListFilters = {
  client: Omit<Client, 'id'|'createdAt'|'updatedAt'>;
  vehicle: Omit<Vehicle, 'id'|'createdAt'|'updatedAt'>;
  details: string;
  issuedOn: Date;
  status: number;
}
export type RepoReceiptsSave = Omit<Crv, 'client'|'vehicle'>;
export type RepoReceiptsUpdate = Omit<Crv, 'clientId'|'client'|'vehicleId'|'vehicle'>;

/* REPOSITORY USERS */
export type RepoUsersListFilters = Pick<User, 'name'|'email'>;
export type RepoUsersSave = Omit<User, 'id'|'createdAt'|'updatedAt'>;
export type RepoUsersUpdate = Omit<User, 'id'|'createdAt'|'updatedAt'>;

/* REPOSITORY VEHICLES */
export type RepoVehiclesFindOrCreate = Omit<Vehicle, 'id'|'createdAt'|'updatedAt'>;
export type RepoVehiclesListFilters = Omit<Vehicle, 'id'|'createdAt'|'updatedAt'>;
export type RepoVehiclesSave = Omit<Vehicle, 'id'|'createdAt'|'updatedAt'>;
export type RepoVehiclesUpdate = Omit<Vehicle, 'id'|'createdAt'|'updatedAt'>;
