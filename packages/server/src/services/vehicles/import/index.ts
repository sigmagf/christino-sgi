import { SequelizeClientsRepository } from '~/repositories/implementations/SequelizeClientsRepository';
import { SequelizeVehiclesRepository } from '~/repositories/implementations/SequelizeVehiclesRepository';

import { VehiclesImportController } from './controller';
import { VehiclesImportService } from './service';

const vehiclesRepo = new SequelizeVehiclesRepository();
const clientsRepo = new SequelizeClientsRepository();

const service = new VehiclesImportService(vehiclesRepo, clientsRepo);
const controller = new VehiclesImportController(service);

export { service as vehiclesImportService, controller as vehiclesImportController };
