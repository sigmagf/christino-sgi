import { IVehicle } from '@christino-sgi/common';

import { IVehiclesRepository } from '~/repositories/IVehiclesRepository';

export class VehiclesUpdateService {
  constructor(private repository: IVehiclesRepository) { }

  async execute(data: Partial<Omit<IVehicle, 'client'|'createdAt'|'updatedAt'>>) {
    if(!await this.repository.findById(data.id)) {
      throw new Error(JSON.stringify({ code: 404, message: 'Veículo não encontrado.', details: null }));
    }

    const vehicle = await this.repository.update(data.id, data);
    return vehicle;
  }
}
