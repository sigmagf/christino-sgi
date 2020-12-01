import { Client } from './Client';
import { Vehicle } from './Vehicle';

export class Receipt {
  public clientId: string;
  public readonly client: Client;
  public vehicleId: string;
  public readonly vehicle: Vehicle;
  public details: string;
  public status: number;
  public issuedOn: Date;

  public readonly createdAt?: Date;
  public updatedAt?: Date;

  constructor(props: Omit<Receipt, 'clientId'|'client'|'vehicleId'|'vehicle'>, clientId?: string, vehicleId?: string) {
    Object.assign(this, props);

    if(clientId) {
      this.clientId = clientId;
    }

    if(vehicleId) {
      this.vehicleId = vehicleId;
    }
  }
}
