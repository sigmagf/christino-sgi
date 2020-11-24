export interface IClient {
  id: string;
  name: string;
  document: string;
  group: string;
}

export interface IVehicle {
  id: string;
  plate: string;
  renavam: string;
  brandModel: string;
  type: string;
}

export interface ICRV {
  id: string;
  client: IClient;
  vehicle: IVehicle;
  details: string;
  status: string;
}
