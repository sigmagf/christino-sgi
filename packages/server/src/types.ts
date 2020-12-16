import { Client } from './entities/Client';
import { Crv } from './entities/CRV';
import { User } from './entities/User';
import { Vehicle } from './entities/Vehicle';
import { Work } from './entities/Work';
import { WorkEntry } from './entities/WorkEntry';

/* REPOSITORY CLIENTS */
export type RepoClientsFindOrCreate = Omit<Client, 'id'|'createdAt'|'updatedAt'>;
export type RepoClientsListFilters = Omit<Client, 'id'|'createdAt'|'updatedAt'>;
export type RepoClientsSave = Omit<Client, 'id'|'createdAt'|'updatedAt'>;
export type RepoClientsUpdate = Omit<Client, 'id'|'createdAt'|'updatedAt'>;

/* REPOSITORY RECEIPTS */
export type RepoCRVsListFilters = {
  client: Omit<Client, 'id'|'createdAt'|'updatedAt'>;
  vehicle: Omit<Vehicle, 'id'|'createdAt'|'updatedAt'>;
  details: string;
  issuedOn: Date;
  status: number;
}
export type RepoCRVsSave = Omit<Crv, 'client'|'vehicle'>;
export type RepoCRVsUpdate = Omit<Crv, 'id'|'clientId'|'client'|'vehicleId'|'vehicle'>;

/* REPOSITORY USERS */
export type RepoUsersListFilters = Pick<User, 'name'|'email'>;
export type RepoUsersSave = Omit<User, 'createdAt'|'updatedAt'>;
export type RepoUsersUpdate = Omit<User, 'id'|'createdAt'|'updatedAt'>;

/* REPOSITORY VEHICLES */
export type RepoVehiclesFindOrCreate = Omit<Vehicle, 'id'|'createdAt'|'updatedAt'>;
export type RepoVehiclesListFilters = Omit<Vehicle, 'id'|'createdAt'|'updatedAt'>;
export type RepoVehiclesSave = Omit<Vehicle, 'createdAt'|'updatedAt'>;
export type RepoVehiclesUpdate = Omit<Vehicle, 'id'|'createdAt'|'updatedAt'>;

/* REPOSITORY WORKS */
export type RepoWorksFilters = Pick<Work, 'client'|'description'|'detranId'|'status'>;
export type RepoWorksSave = Omit<Work, 'client'|'entries'|'createdAt'|'updatedAt'>;
export type RepoWorksUpdate = Omit<Work, 'id'|'client'|'entries'|'createdAt'|'updatedAt'>;
export type RepoWorksSaveEntry = Omit<WorkEntry, 'workId'|'createdAt'>;
