import { TypeORMClientsRepository } from '~/repositories/implementations/TypeORMClientsRepository';

import { ClientsUpdateController } from './controller';
import { ClientsUpdateService } from './service';

const repository = new TypeORMClientsRepository();

const service = new ClientsUpdateService(repository);
const controller = new ClientsUpdateController(service);

export { service as clientsUpdateService, controller as clientsUpdateController };
