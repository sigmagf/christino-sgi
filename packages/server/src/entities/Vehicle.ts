import { v4 } from 'uuid';

import { Client } from './Client';

export class Vehicle {
  public readonly id: string;

  public clientId: string;
  public plate: string;
  public renavam: string;
  public cla: string;
  public crv: string;
  public brand_model: string;
  public type: string;
  public status: number;
  public issued_on: Date;

  public readonly client: Client;

  public readonly createdAt?: Date;
  public updatedAt?: Date;

  constructor(props: Omit<Vehicle, 'id'>, id?: string) {
    Object.assign(this, props);

    if(!id) {
      this.id = v4();
    } else {
      this.id = id;
    }
  }
}
