import { TypeORMClientsRepository } from '~/repositories/implementations/TypeORMClientsRepository';
import { TypeORMVehiclesRepository } from '~/repositories/implementations/TypeORMVehiclesRepository';

import { VehiclesCreateController } from './controller';
import { VehiclesCreateService } from './service';

const vehiclesRepo = new TypeORMVehiclesRepository();
const clientsRepo = new TypeORMClientsRepository();

const service = new VehiclesCreateService(vehiclesRepo, clientsRepo);
const controller = new VehiclesCreateController(service);

export { service as vehiclesCreateService, controller as vehiclesCreateController };
