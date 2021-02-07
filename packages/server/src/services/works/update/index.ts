import { TypeORMClientsRepository } from '~/repositories/implementations/TypeORMClientsRepository';
import { TypeORMWorksRepository } from '~/repositories/implementations/TypeORMWorksRepository';

import { WorksUpdateController } from './controller';
import { WorksUpdateService } from './service';

const worksRepo = new TypeORMWorksRepository();
const clientsRepo = new TypeORMClientsRepository();

const service = new WorksUpdateService(worksRepo, clientsRepo);
const controller = new WorksUpdateController(service);

export { service as worksUpdateService, controller as worksUpdateController };
