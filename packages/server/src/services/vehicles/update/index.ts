import { TypeORMVehiclesRepository } from '~/repositories/implementations/TypeORMVehiclesRepository';

import { VehiclesUpdateController } from './controller';
import { VehiclesUpdateService } from './service';

const repository = new TypeORMVehiclesRepository();

const service = new VehiclesUpdateService(repository);
const controller = new VehiclesUpdateController(service);

export { service as vehiclesUpdateService, controller as vehiclesUpdateController };
