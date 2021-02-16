import { SequelizeVehiclesRepository } from '~/repositories/implementations/SequelizeVehiclesRepository';

import { VehiclesListController } from './controller';
import { VehiclesListService } from './service';

const repository = new SequelizeVehiclesRepository();

const service = new VehiclesListService(repository);
const controller = new VehiclesListController(service);

export { service as vehiclesListService, controller as vehiclesListController };
