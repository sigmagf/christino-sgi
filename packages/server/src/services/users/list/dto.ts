import { User } from '~/entities/User';

export interface IUsersListRequestDTO {
  page: number;
  limit: number;
  noPagination: string;
  filters: Omit<User, 'id'|'createdAt'|'updatedAt'>;
}
