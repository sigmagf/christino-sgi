import { TypeORMClientsRepository } from '~/repositories/implementations/TypeORMClientsRepository';

import { ClientsListController } from './controller';
import { ClientsListService } from './service';

const repository = new TypeORMClientsRepository();

const service = new ClientsListService(repository);
const controller = new ClientsListController(service);

export { service as clientsListService, controller as clientsListController };
