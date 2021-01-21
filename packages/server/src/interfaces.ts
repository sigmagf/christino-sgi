export interface IPagination<T> {
  page: {
    total: number;
    current: number;
    limit: number;
  };
  data: Array<T>;
}

export interface IClientsListFilters {
  pagination: boolean;
  name: string;
  folder: string;
}

export interface IVehiclesListFilters {
  pagination: boolean;
  client_id: string;
  folder: string;
  plate: string;
  renavam: string;
  crv: string;
  brand_model: string;
}
