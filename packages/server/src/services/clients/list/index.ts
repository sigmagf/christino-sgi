import { SequelizeClientsRepository } from '~/repositories/implementations/SequelizeClientsRepository';

import { ClientsListController } from './controller';
import { ClientsListService } from './service';

const repository = new SequelizeClientsRepository();
const service = new ClientsListService(repository);
const controller = new ClientsListController(service);

export { service as clientsListService, controller as clientsListController };
