import { PrismaClientsRepository } from '~/repositories/implementations/PrismaClientsRepository';

import { ClientsListController } from './controller';
import { ClientsListService } from './service';

const repository = new PrismaClientsRepository();
const service = new ClientsListService(repository);
const controller = new ClientsListController(service);

export { controller as clientsListController, service as clientsListSerivce };
