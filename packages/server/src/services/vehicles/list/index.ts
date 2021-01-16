import { TypeORMVehiclesRepository } from '~/repositories/implementations/TypeORMVehiclesRepository';

import { VehiclesListController } from './controller';
import { VehiclesListService } from './service';

const repository = new TypeORMVehiclesRepository();

const service = new VehiclesListService(repository);
const controller = new VehiclesListController(service);

export { service as vehiclesListService, controller as vehiclesListController };
