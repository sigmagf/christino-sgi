import { SequelizeVehiclesRepository } from '~/repositories/implementations/SequelizeVehiclesRepository';

import { VehiclesFindController } from './controller';
import { VehiclesFindService } from './service';

const repository = new SequelizeVehiclesRepository();

const service = new VehiclesFindService(repository);
const controller = new VehiclesFindController(service);

export { service as vehiclesFindService, controller as vehiclesFindController };
