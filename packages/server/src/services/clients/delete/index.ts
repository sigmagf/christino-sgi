import { TypeORMClientsRepository } from '~/repositories/implementations/TypeORMClientsRepository';

import { ClientsDeleteController } from './controller';
import { ClientsDeleteService } from './service';

const repository = new TypeORMClientsRepository();

const service = new ClientsDeleteService(repository);
const controller = new ClientsDeleteController(service);

export { service as clientsDeleteService, controller as clientsDeleteController };
