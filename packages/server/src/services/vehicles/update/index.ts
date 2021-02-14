import { SequelizeClientsRepository } from '~/repositories/implementations/SequelizeClientsRepository';
import { SequelizeVehiclesRepository } from '~/repositories/implementations/SequelizeVehiclesRepository';

import { VehiclesUpdateController } from './controller';
import { VehiclesUpdateService } from './service';

const vehiclesRepo = new SequelizeVehiclesRepository();
const clientsRepo = new SequelizeClientsRepository();

const service = new VehiclesUpdateService(vehiclesRepo, clientsRepo);
const controller = new VehiclesUpdateController(service);

export { service as vehiclesUpdateService, controller as vehiclesUpdateController };
