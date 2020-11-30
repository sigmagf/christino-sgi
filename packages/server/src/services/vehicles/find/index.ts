import { PrismaVehiclesRepository } from '~/repositories/implementations/PrismaVehiclesRepository';

import { VehiclesFindController } from './controller';
import { VehiclesFindService } from './service';

const repository = new PrismaVehiclesRepository();
const service = new VehiclesFindService(repository);
const controller = new VehiclesFindController(service);

export { controller as vehiclesFindController, service as vehiclesFindSerivce };
