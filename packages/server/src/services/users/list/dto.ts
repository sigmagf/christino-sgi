export interface IUsersListRequestDTO {
  page: number;
  limit: number;
  filters: {
    name: string;
    email: string;
  };
}
