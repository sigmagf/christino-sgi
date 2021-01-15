import { User } from '~/entities/User';

export type IUsersCreateRequestDTO = Omit<User, 'id'|'createdAt'|'updatedAt'>;
