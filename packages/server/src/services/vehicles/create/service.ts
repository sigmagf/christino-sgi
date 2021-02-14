import { IVehicle } from '~/entities/IVehicle';
import { IClientsRepository } from '~/repositories/IClientsRepository';
import { IVehiclesRepository } from '~/repositories/IVehiclesRepository';
import { convertStatus } from '~/utils/convertStatus';

export class VehiclesCreateService {
  constructor(private vehiclesRepo: IVehiclesRepository, private clientsRepo: IClientsRepository) { }

  async execute(data: Pick<IVehicle, 'clientId'|'plate'|'renavam'|'crv'|'brandModel'|'type'|'details'|'status'>) {
    if(await this.vehiclesRepo.findByClientPlate(data.clientId, data.plate)) {
      throw new Error(JSON.stringify({ code: 400, message: 'Vehicle already exists for this client.' }));
    }

    if(await this.vehiclesRepo.findByClientRenavam(data.clientId, data.renavam)) {
      throw new Error(JSON.stringify({ code: 400, message: 'Vehicle already exists for this client.' }));
    }

    const vehicle = await this.vehiclesRepo.create({
      clientId: data.clientId,
      plate: data.plate,
      renavam: data.renavam,
      crv: data.crv || null,
      brandModel: data.brandModel,
      type: data.type,
      details: data.details || null,
      status: convertStatus(data.status),
    });

    return vehicle;
  }
}
