import { PrismaClientsRepository } from '~/repositories/implementations/PrismaClientsRepository';

import { ClientsCreateController } from './controller';
import { ClientCreateService } from './service';

const repository = new PrismaClientsRepository();
const service = new ClientCreateService(repository);
const controller = new ClientsCreateController(service);

export { controller as clientsCreateController, service as clientsCreateSerivce };
