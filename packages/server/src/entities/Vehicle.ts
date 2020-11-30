import { v4 } from 'uuid';

export class Vehicle {
  public readonly id: string;

  public plate: string;
  public renavam: string;
  public brandModel: string;
  public type: string;

  public readonly createdAt?: Date;
  public updatedAt?: Date;

  constructor(props: Omit<Vehicle, 'id'>, id?: string) {
    Object.assign(this, props);

    if(!id) {
      this.id = v4();
    }
  }
}
