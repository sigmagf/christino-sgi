import { IVehiclesRepository } from '~/repositories/IVehiclesRepository';

import { IVehiclesDeleteRequestDTO } from './dto';

export class VehiclesDeleteService {
  constructor(private repository: IVehiclesRepository) { }

  async execute(data: IVehiclesDeleteRequestDTO): Promise<void> {
    if(!await this.repository.findById(data.id)) {
      throw new Error('Veiculo nao encontrado');
    }

    await this.repository.delete(data.id);
  }
}
