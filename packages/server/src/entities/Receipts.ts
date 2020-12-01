import { Client } from './Client';
import { Vehicle } from './Vehicle';

export class Receipt {
  public clientId: string;
  public readonly client: Client;
  public vehicleId: string;
  public readonly vehicle: Vehicle;
  public details: string;
  public status: 'ORIGINAL'|'XEROX'|'OUTRO'|'BAIXADO';
  public issuedOn: Date;

  public readonly createdAt?: Date;
  public updatedAt?: Date;

  constructor(props: Omit<Receipt, 'client'|'vehicle'>) {
    Object.assign(this, props);
  }
}
