import { PrismaClientsRepository } from '~/repositories/implementations/PrismaClientsRepository';

import { ClientsFindController } from './controller';
import { ClientsFindService } from './service';

const repository = new PrismaClientsRepository();
const service = new ClientsFindService(repository);
const controller = new ClientsFindController(service);

export { controller as clientsFindController, service as clientsFindSerivce };
