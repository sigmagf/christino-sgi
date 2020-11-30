import { PrismaVehiclesRepository } from '~/repositories/implementations/PrismaVehiclesRepository';

import { VehiclesDeleteController } from './controller';
import { VehiclesDeleteService } from './service';

const repository = new PrismaVehiclesRepository();
const service = new VehiclesDeleteService(repository);
const controller = new VehiclesDeleteController(service);

export { controller as clientsDeleteController, service as clientsDeleteSerivce };
