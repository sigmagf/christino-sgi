import { SequelizeVehiclesRepository } from '~/repositories/implementations/SequelizeVehiclesRepository';

import { VehiclesUpdateController } from './controller';
import { VehiclesUpdateService } from './service';

const vehiclesRepo = new SequelizeVehiclesRepository();

const service = new VehiclesUpdateService(vehiclesRepo);
const controller = new VehiclesUpdateController(service);

export { service as vehiclesUpdateService, controller as vehiclesUpdateController };
