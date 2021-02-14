import { IVehicle } from '~/entities/IVehicle';
import { IVehiclesRepository } from '~/repositories/IVehiclesRepository';

export class VehiclesFindService {
  constructor(private repository: IVehiclesRepository) { }

  async execute(data: Pick<IVehicle, 'id'>) {
    const vehicle = await this.repository.findById(data.id);

    if(!vehicle) {
      throw new Error(JSON.stringify({ code: 404, message: 'Veículo não encontrado.', details: null }));
    }

    return vehicle;
  }
}
