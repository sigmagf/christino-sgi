import { IVehicle } from '@christino-sgi/common';

import { IVehiclesRepository } from '~/repositories/IVehiclesRepository';

export class VehiclesCreateService {
  constructor(private repository: IVehiclesRepository) { }

  async execute(data: Omit<IVehicle, 'id'|'client'|'createdAt'|'updatedAt'|'createdByUser'|'updatedByUser'|'crlveIncluded'|'withdrawalIncluded'>) {
    if(await this.repository.findByClientPlate(data.clientId, data.plate)) {
      throw new Error(JSON.stringify({ code: 400, message: 'Um veiculo com esta placa já existe para este cliente.', details: null }));
    }

    if(await this.repository.findByClientRenavam(data.clientId, data.renavam)) {
      throw new Error(JSON.stringify({ code: 400, message: 'Um veiculo com este renavam já existe para este cliente.', details: null }));
    }

    const vehicle = await this.repository.create(data);
    return vehicle;
  }
}
