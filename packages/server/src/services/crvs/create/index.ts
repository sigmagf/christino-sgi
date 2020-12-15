import { PrismaClientsRepository } from '~/repositories/implementations/PrismaClientsRepository';
import { PrismaCRVsRepository } from '~/repositories/implementations/PrismaCRVsRepository';
import { PrismaVehiclesRepository } from '~/repositories/implementations/PrismaVehiclesRepository';

import { CRVsCreateController } from './controller';
import { CRVsCreateService } from './service';

const crvs = new PrismaCRVsRepository();
const clients = new PrismaClientsRepository();
const vehicles = new PrismaVehiclesRepository();
const service = new CRVsCreateService(crvs, clients, vehicles);
const controller = new CRVsCreateController(service);

export { controller as crvsCreateController, service as crvsCreateSerivce };
