import { User } from '~/entities/User';

export type IUsersCreateRequestDTO = Omit<User, 'id'|'email_change_token'|'email_change_expires'|'pwd_reset_token'|'pwd_reset_expires'>;
