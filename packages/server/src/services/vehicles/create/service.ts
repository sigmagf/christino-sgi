import { Vehicle } from '~/entities/Vehicle';
import { IVehiclesRepository } from '~/repositories/IVehiclesRepository';

import { IVehiclesCreateRequestDTO } from './dto';

export class ClientCreateService {
  constructor(private repository: IVehiclesRepository) { }

  async execute(data: IVehiclesCreateRequestDTO) {
    if(await this.repository.findByPlate(data.plate)) {
      throw new Error('Vehicle already exists with plate.');
    }

    if(await this.repository.findByRenavam(data.renavam)) {
      throw new Error('Vehicle already exists with renavam.');
    }

    const vehicle = await this.repository.save(new Vehicle(data));

    return vehicle;
  }
}
