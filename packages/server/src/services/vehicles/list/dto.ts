export interface IVehiclesListRequestDTO {
  page: number;
  limit: number;
  filters: {
    plate: string;
    renavam: string;
    brandModel: string;
    type: string;
  };
}
