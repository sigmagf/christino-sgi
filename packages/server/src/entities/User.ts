import { v4 } from 'uuid';

export class User {
  public readonly id: string;

  public name: string;
  public email: string;
  public password: string;

  public newEmail?: string;
  public newEmailToken?: string;
  public newEmailExpires?: Date;
  public pwdRstToken?: string;
  public pwdRstExpires?: Date;

  public readonly createdAt?: Date;
  public updatedAt?: Date;

  constructor(props: Omit<User, 'id'>, id?: string) {
    Object.assign(this, props);

    if(!id) {
      this.id = v4();
    }
  }
}
