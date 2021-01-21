export interface IVehiclesCreateRequestDTO {
  name: string;
  document: string;
  folder?: string;

  plate: string;
  renavam: string;
  cla: string;
  crv: string;
  brand_model: string;
  type: string;
  details: string;
  status: string;
  issued_on: string;
}
