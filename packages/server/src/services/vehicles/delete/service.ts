import { IVehicle } from '~/entities/IVehicle';
import { IVehiclesRepository } from '~/repositories/IVehiclesRepository';

export class VehiclesDeleteService {
  constructor(private repository: IVehiclesRepository) { }

  async execute(data: Pick<IVehicle, 'id'>) {
    if(!await this.repository.findById(data.id)) {
      throw new Error(JSON.stringify({ code: 404, message: 'Veículo não encontrado.', details: null }));
    }

    await this.repository.delete(data.id);
  }
}
