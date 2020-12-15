import { v4 } from 'uuid';

export class Client {
  public readonly id: string;

  public name: string;
  public document: string;
  public group: string;

  public readonly createdAt?: Date;
  public updatedAt?: Date;

  constructor(props: Omit<Client, 'id'>, id?: string) {
    Object.assign(this, props);

    if(!id) {
      this.id = v4();
    }
  }
}
