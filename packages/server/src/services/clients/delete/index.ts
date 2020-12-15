import { PrismaClientsRepository } from '~/repositories/implementations/PrismaClientsRepository';

import { ClientsDeleteController } from './controller';
import { ClientsDeleteService } from './service';

const repository = new PrismaClientsRepository();
const service = new ClientsDeleteService(repository);
const controller = new ClientsDeleteController(service);

export { controller as clientsDeleteController, service as clientsDeleteSerivce };
