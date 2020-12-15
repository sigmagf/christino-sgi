import { PrismaVehiclesRepository } from '~/repositories/implementations/PrismaVehiclesRepository';

import { VehiclesListController } from './controller';
import { VehiclesListService } from './service';

const repository = new PrismaVehiclesRepository();
const service = new VehiclesListService(repository);
const controller = new VehiclesListController(service);

export { controller as vehiclesListController, service as vehiclesListSerivce };
