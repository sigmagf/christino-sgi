import { PrismaVehiclesRepository } from '~/repositories/implementations/PrismaVehiclesRepository';

import { VehiclesUpdateController } from './controller';
import { VehiclesUpdateService } from './service';

const repository = new PrismaVehiclesRepository();
const service = new VehiclesUpdateService(repository);
const controller = new VehiclesUpdateController(service);

export { controller as vehiclesUpdateController, service as vehiclesUpdateSerivce };
