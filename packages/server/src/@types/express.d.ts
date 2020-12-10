import { User } from '~/entities/User';

declare namespace Express {
  export interface Request {
     user: User;
  }
}
