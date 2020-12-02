import { Receipt } from '~/entities/Receipts';
import { IClientsRepository } from '~/repositories/IClientsRepository';
import { IReceiptsRepository } from '~/repositories/IReceiptsRepository';
import { IVehiclesRepository } from '~/repositories/IVehiclesRepository';

import { IReceiptsCreateRequestDTO } from './dto';

export class ReceiptsCreateService {
  constructor(
    private receipts: IReceiptsRepository,
    private clients: IClientsRepository,
    private vehicles: IVehiclesRepository,
  ) { }

  async execute(data: IReceiptsCreateRequestDTO) {
    const client = await this.clients.findOrCreate(data.client);
    const vehicle = await this.vehicles.findOrCreate(data.vehicle);

    if(!client || !vehicle) {
      throw new Error('Database error.');
    }

    if(await this.receipts.find(client.id, vehicle.id)) {
      throw new Error('Receipt already exists.');
    }

    const receipt = await this.receipts.save(new Receipt(data, client.id, vehicle.id));

    return receipt;
  }
}
