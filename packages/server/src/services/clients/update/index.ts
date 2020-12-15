import { PrismaClientsRepository } from '~/repositories/implementations/PrismaClientsRepository';

import { ClientsUpdateController } from './controller';
import { ClientsUpdateService } from './service';

const repository = new PrismaClientsRepository();
const service = new ClientsUpdateService(repository);
const controller = new ClientsUpdateController(service);

export { controller as clientsUpdateController, service as clientsUpdateSerivce };
