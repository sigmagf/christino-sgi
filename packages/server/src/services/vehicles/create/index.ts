import { SequelizeVehiclesRepository } from '~/repositories/implementations/SequelizeVehiclesRepository';

import { VehiclesCreateController } from './controller';
import { VehiclesCreateService } from './service';

const vehiclesRepo = new SequelizeVehiclesRepository();

const service = new VehiclesCreateService(vehiclesRepo);
const controller = new VehiclesCreateController(service);

export { service as vehiclesCreateService, controller as vehiclesCreateController };
