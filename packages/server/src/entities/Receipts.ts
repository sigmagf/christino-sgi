import { v4 } from 'uuid';

import { Client } from './Client';
import { Vehicle } from './Vehicle';

export class Receipt {
  public readonly id: string;

  public clientId: string;
  public readonly client: Client;
  public vehicleId: string;
  public readonly vehicle: Vehicle;
  public details: string;
  public status: string;
  public issuedOn: Date;

  public readonly createdAt?: Date;
  public updatedAt?: Date;

  constructor(props: Omit<Receipt, 'id'>, id?: string) {
    Object.assign(this, props);

    if(!id) {
      this.id = v4();
    }
  }
}
