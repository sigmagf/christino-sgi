import { SequelizeClientsRepository } from '~/repositories/implementations/SequelizeClientsRepository';

import { ClientsDeleteController } from './controller';
import { ClientsDeleteService } from './service';

const repository = new SequelizeClientsRepository();
const service = new ClientsDeleteService(repository);
const controller = new ClientsDeleteController(service);

export { service as clientsDeleteService, controller as clientsDeleteController };
