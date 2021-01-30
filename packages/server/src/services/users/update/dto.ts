import { User } from '~/entities/User';

export type IUsersUpdateRequestDTO = Pick<User, 'id'|'name'|'email'|'password'|'desp_permission'|'segu_permission'>;
