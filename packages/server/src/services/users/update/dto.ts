import { User } from '@prisma/client';

export interface IUsersUpdateRequestDTO {
  id: string;
  user: Omit<User, 'id'|'createdAt'|'updatedAt'>;
}
