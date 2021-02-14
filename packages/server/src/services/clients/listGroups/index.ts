import { SequelizeClientsRepository } from '~/repositories/implementations/SequelizeClientsRepository';

import { ClientsListGroupsController } from './controller';
import { ClientsListGroupsService } from './service';

const repository = new SequelizeClientsRepository();
const service = new ClientsListGroupsService(repository);
const controller = new ClientsListGroupsController(service);

export { service as clientsListGroupsService, controller as clientsListGroupsController };
