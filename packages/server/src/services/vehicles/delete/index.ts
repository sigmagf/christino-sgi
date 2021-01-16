import { TypeORMVehiclesRepository } from '~/repositories/implementations/TypeORMVehiclesRepository';

import { VehiclesDeleteController } from './controller';
import { VehiclesDeleteService } from './service';

const repository = new TypeORMVehiclesRepository();

const service = new VehiclesDeleteService(repository);
const controller = new VehiclesDeleteController(service);

export { service as vehiclesDeleteService, controller as vehiclesDeleteController };
