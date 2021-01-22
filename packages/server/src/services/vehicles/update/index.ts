import { TypeORMClientsRepository } from '~/repositories/implementations/TypeORMClientsRepository';
import { TypeORMVehiclesRepository } from '~/repositories/implementations/TypeORMVehiclesRepository';

import { VehiclesUpdateController } from './controller';
import { VehiclesUpdateService } from './service';

const vehiclesRepo = new TypeORMVehiclesRepository();
const clientsRepo = new TypeORMClientsRepository();

const service = new VehiclesUpdateService(vehiclesRepo, clientsRepo);
const controller = new VehiclesUpdateController(service);

export { service as vehiclesUpdateService, controller as vehiclesUpdateController };
