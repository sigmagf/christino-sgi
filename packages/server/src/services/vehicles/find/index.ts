import { TypeORMVehiclesRepository } from '~/repositories/implementations/TypeORMVehiclesRepository';

import { VehiclesFindController } from './controller';
import { VehiclesFindService } from './service';

const repository = new TypeORMVehiclesRepository();

const service = new VehiclesFindService(repository);
const controller = new VehiclesFindController(service);

export { service as vehiclesFindService, controller as vehiclesFindController };
