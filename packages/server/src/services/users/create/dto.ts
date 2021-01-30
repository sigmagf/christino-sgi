import { User } from '~/entities/User';

export type IUsersCreateRequestDTO = Pick<User, 'name'|'email'|'password'|'desp_permission'|'segu_permission'>;
