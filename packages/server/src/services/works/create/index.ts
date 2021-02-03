import { TypeORMClientsRepository } from '~/repositories/implementations/TypeORMClientsRepository';
import { TypeORMWorksRepository } from '~/repositories/implementations/TypeORMWorksRepository';

import { WorksCreateController } from './controller';
import { WorksCreateService } from './service';

const worksRepo = new TypeORMWorksRepository();
const clientsRepo = new TypeORMClientsRepository();

const service = new WorksCreateService(worksRepo, clientsRepo);
const controller = new WorksCreateController(service);

export { service as worksCreateService, controller as worksCreateController };
