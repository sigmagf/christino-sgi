import { PrismaVehiclesRepository } from '~/repositories/implementations/PrismaVehiclesRepository';

import { VehiclesCreateController } from './controller';
import { ClientCreateService } from './service';

const repository = new PrismaVehiclesRepository();
const service = new ClientCreateService(repository);
const controller = new VehiclesCreateController(service);

export { controller as vehiclesCreateController, service as vehiclesCreateSerivce };
