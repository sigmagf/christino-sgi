import bcrypt from 'bcryptjs';

import { Receipt } from '~/entities/Receipts';
import { User } from '~/entities/User';
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

    const receipt = await this.receipts.save(new Receipt(data, client.id, vehicle.id));

    return receipt;
  }
}
