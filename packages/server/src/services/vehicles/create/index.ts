import { SequelizeClientsRepository } from '~/repositories/implementations/SequelizeClientsRepository';
import { SequelizeVehiclesRepository } from '~/repositories/implementations/SequelizeVehiclesRepository';

import { VehiclesCreateController } from './controller';
import { VehiclesCreateService } from './service';

const vehiclesRepo = new SequelizeVehiclesRepository();
const clientsRepo = new SequelizeClientsRepository();

const service = new VehiclesCreateService(vehiclesRepo, clientsRepo);
const controller = new VehiclesCreateController(service);

export { service as vehiclesCreateService, controller as vehiclesCreateController };
