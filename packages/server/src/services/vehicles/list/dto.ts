export interface IVehiclesListRequestDTO {
  page: number;
  limit: number;
  filters: {
    name: string;
    document: string;
    group: string;
  };
}
