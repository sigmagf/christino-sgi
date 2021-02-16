import { SequelizeVehiclesRepository } from '~/repositories/implementations/SequelizeVehiclesRepository';

import { VehiclesCreateController } from './controller';
import { VehiclesCreateService } from './service';

const repository = new SequelizeVehiclesRepository();

const service = new VehiclesCreateService(repository);
const controller = new VehiclesCreateController(service);

export { service as vehiclesCreateService, controller as vehiclesCreateController };
