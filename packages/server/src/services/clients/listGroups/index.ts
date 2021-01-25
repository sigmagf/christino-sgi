import { TypeORMClientsRepository } from '~/repositories/implementations/TypeORMClientsRepository';

import { ClientsListGroupsController } from './controller';
import { ClientsListGroupsService } from './service';

const repository = new TypeORMClientsRepository();

const service = new ClientsListGroupsService(repository);
const controller = new ClientsListGroupsController(service);

export { service as clientsListGroupsService, controller as clientsListGroupsController };
