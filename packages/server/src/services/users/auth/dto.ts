import { User } from '~/entities/User';

export type IUsersAuthRequestDTO = Pick<User, 'email'|'password'>;
