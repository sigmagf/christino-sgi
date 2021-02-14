import { IVehicle } from '~/entities/IVehicle';
import { IVehiclesRepository } from '~/repositories/IVehiclesRepository';

export class VehiclesDeleteService {
  constructor(private repository: IVehiclesRepository) { }

  async execute(data: Pick<IVehicle, 'id'>) {
    if(!await this.repository.findById(data.id)) {
      throw new Error(JSON.stringify({ code: 404, message: 'Vehicle not found.' }));
    }

    await this.repository.delete(data.id);
  }
}
