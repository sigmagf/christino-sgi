import { SequelizeClientsRepository } from '~/repositories/implementations/SequelizeClientsRepository';

import { ClientsUpdateController } from './controller';
import { ClientsUpdateService } from './service';

const repository = new SequelizeClientsRepository();
const service = new ClientsUpdateService(repository);
const controller = new ClientsUpdateController(service);

export { service as clientsUpdateService, controller as clientsUpdateController };
