export interface IClientsListRequestDTO {
  page: number;
  limit: number;
  filters: {
    name: string;
    document: string;
    group: string;
  };
}
