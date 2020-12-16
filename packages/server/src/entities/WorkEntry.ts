import { v4 } from 'uuid';

export class WorkEntry {
  public readonly id: string;

  public workId: string;
  public details: string;

  public readonly createdAt?: Date;

  constructor(props: Omit<WorkEntry, 'id'>, id?: string) {
    Object.assign(this, props);

    if(!id) {
      this.id = v4();
    }
  }
}
