import { SequelizeClientsRepository } from '~/repositories/implementations/SequelizeClientsRepository';

import { ClientsFindController } from './controller';
import { ClientsFindService } from './service';

const repository = new SequelizeClientsRepository();
const service = new ClientsFindService(repository);
const controller = new ClientsFindController(service);

export { service as clientsFindService, controller as clientsFindController };
