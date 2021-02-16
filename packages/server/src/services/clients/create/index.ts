import { SequelizeClientsRepository } from '~/repositories/implementations/SequelizeClientsRepository';

import { ClientsCreateController } from './controller';
import { ClientsCreateService } from './service';

const repository = new SequelizeClientsRepository();
const service = new ClientsCreateService(repository);
const controller = new ClientsCreateController(service);

export { service as clientsCreateService, controller as clientsCreateController };
