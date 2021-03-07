import { IVehicle, IClient, IWork, IUser } from '@christino-sgi/common';

/* - STORAGE - */
export interface IStorage {
  token: string;
  userName: string;
  appBarExpanded: boolean;
}
/* END STIRAGE */

/* - BACKEND - */
export interface IVehiclesRequestFilters extends Partial<Pick<IVehicle, 'clientId'|'plate'|'renavam'|'crv'|'brandModel'>> {
  page: number;
  limit: number;

  group?: string;
  plateEnd?: string;
  status: number|number[];
  includeTruck?: boolean;
}

export interface IClientsRequestFilters extends Partial<Pick<IClient, 'name'|'document'|'group'>> {
  page: number;
  limit: number;
}

export interface IWorksRequestFilters extends Partial<Pick<IWork, 'clientId'|'serviceId'|'identifier'>> {
  page: number;
  limit: number;

  value?: string;
  status?: string | string[];
  group?: string;
  sectorId?: string;
  timeCourseStart?: Date|string;
  timeCourseEnd?: Date|string;
}

export interface IUserAuth {
  user: IUser;
  token: string;
}

export type IUserPermissions = Omit<IUser, 'id'|'name'|'email'|'password'|'createdAt'|'updatedAt'>;
/* END BACKEND */
