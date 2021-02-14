import { IVehicle } from '~/entities/IVehicle';
import { IVehiclesRepository } from '~/repositories/IVehiclesRepository';

export class VehiclesCreateService {
  constructor(private vehiclesRepo: IVehiclesRepository) { }

  async execute(data: Pick<IVehicle, 'clientId'|'plate'|'renavam'|'crv'|'brandModel'|'type'|'details'|'status'>) {
    if(await this.vehiclesRepo.findByClientPlate(data.clientId, data.plate)) {
      throw new Error(JSON.stringify({ code: 400, message: 'Um veiculo com esta placa já existe para este cliente.', details: null }));
    }

    if(await this.vehiclesRepo.findByClientRenavam(data.clientId, data.renavam)) {
      throw new Error(JSON.stringify({ code: 400, message: 'Um veiculo com este renavam já existe para este cliente.', details: null }));
    }

    const vehicle = await this.vehiclesRepo.create(data);
    return vehicle;
  }
}
