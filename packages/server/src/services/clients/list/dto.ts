export interface IClientsListRequestDTO {
  page: number;
  limit: number;
  pagination: boolean;

  name?: string;
  group?: string;
}
