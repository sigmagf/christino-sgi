export interface IVehiclesListRequestDTO {
  page: number;
  limit: number;
  pagination: boolean;

  client_id?: string;
  group?: string;
  plate?: string;
  renavam?: string;
  crv?: string;
  brand_model?: string;
}
