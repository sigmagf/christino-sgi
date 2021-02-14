import { IVehicle } from '~/entities/IVehicle';
import { IVehiclesRepository } from '~/repositories/IVehiclesRepository';

export class VehiclesUpdateService {
  constructor(private vehiclesRepo: IVehiclesRepository) { }

  async execute(data: Partial<Omit<IVehicle, 'client'|'createdAt'|'updatedAt'>>) {
    if(!await this.vehiclesRepo.findById(data.id)) {
      throw new Error(JSON.stringify({ code: 404, message: 'Veículo não encontrado.', details: null }));
    }

    const vehicle = await this.vehiclesRepo.update(data.id, data);
    return vehicle;
  }
}
