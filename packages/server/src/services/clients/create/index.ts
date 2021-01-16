import { TypeORMClientsRepository } from '~/repositories/implementations/TypeORMClientsRepository';

import { ClientsCreateController } from './controller';
import { ClientsCreateService } from './service';

const repository = new TypeORMClientsRepository();

const service = new ClientsCreateService(repository);
const controller = new ClientsCreateController(service);

export { service as clientsCreateService, controller as clientsCreateController };
