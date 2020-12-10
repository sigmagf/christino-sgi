import { v4 } from 'uuid';

import { Client } from './Client';
import { WorkEntry } from './WorkEntry';

export class Work {
  public readonly id: string;

  public clientId: string;
  public detranId: string;
  public description: string;
  public status: number;

  public readonly client: Client;
  public readonly entries: WorkEntry[];

  public readonly createdAt?: Date;
  public updatedAt?: Date;

  constructor(props: Omit<Work, 'id'|'client'|'entries'>, id?: string) {
    Object.assign(this, props);

    if(!id) {
      this.id = v4();
    }
  }
}
