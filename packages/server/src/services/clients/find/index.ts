import { TypeORMClientsRepository } from '~/repositories/implementations/TypeORMClientsRepository';

import { ClientsFindController } from './controller';
import { ClientsFindService } from './service';

const repository = new TypeORMClientsRepository();

const service = new ClientsFindService(repository);
const controller = new ClientsFindController(service);

export { service as clientsFindService, controller as clientsFindController };
