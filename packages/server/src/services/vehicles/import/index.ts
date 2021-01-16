import { TypeORMClientsRepository } from '~/repositories/implementations/TypeORMClientsRepository';
import { TypeORMVehiclesRepository } from '~/repositories/implementations/TypeORMVehiclesRepository';

import { VehiclesImportController } from './controller';
import { VehiclesImportService } from './service';

const vehiclesRepo = new TypeORMVehiclesRepository();
const clientsRepo = new TypeORMClientsRepository();

const service = new VehiclesImportService(vehiclesRepo, clientsRepo);
const controller = new VehiclesImportController(service);

export { service as vehiclesImportService, controller as vehiclesImportController };
