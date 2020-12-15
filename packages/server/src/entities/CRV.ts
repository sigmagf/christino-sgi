import { Client } from './Client';
import { Vehicle } from './Vehicle';

export class Crv {
  public clientId: string;
  public vehicleId: string;
  public details: string;
  public status: number;
  public issuedOn: Date;

  public readonly client: Client;
  public readonly vehicle: Vehicle;

  public readonly createdAt?: Date;
  public updatedAt?: Date;

  constructor(props: Omit<Crv, 'client'|'vehicle'>) {
    Object.assign(this, props);
  }
}
