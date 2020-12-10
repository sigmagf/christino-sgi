import { PrismaClientsRepository } from '~/repositories/implementations/PrismaClientsRepository';
import { PrismaCRVsRepository } from '~/repositories/implementations/PrismaCRVsRepository';
import { PrismaVehiclesRepository } from '~/repositories/implementations/PrismaVehiclesRepository';

import { ReceiptsCreateController } from './controller';
import { ReceiptsCreateService } from './service';

const receipts = new PrismaCRVsRepository();
const clients = new PrismaClientsRepository();
const vehicles = new PrismaVehiclesRepository();
const service = new ReceiptsCreateService(receipts, clients, vehicles);
const controller = new ReceiptsCreateController(service);

export { controller as receiptsCreateController, service as receiptsCreateSerivce };
