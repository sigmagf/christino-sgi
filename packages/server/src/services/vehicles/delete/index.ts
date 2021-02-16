import { SequelizeVehiclesRepository } from '~/repositories/implementations/SequelizeVehiclesRepository';

import { VehiclesDeleteController } from './controller';
import { VehiclesDeleteService } from './service';

const repository = new SequelizeVehiclesRepository();

const service = new VehiclesDeleteService(repository);
const controller = new VehiclesDeleteController(service);

export { service as vehiclesDeleteService, controller as vehiclesDeleteController };
