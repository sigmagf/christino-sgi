import { TypeORMWorksRepository } from '~/repositories/implementations/TypeORMWorksRepository';

import { WorksUpdateController } from './controller';
import { WorksUpdateService } from './service';

const repository = new TypeORMWorksRepository();

const service = new WorksUpdateService(repository);
const controller = new WorksUpdateController(service);

export { service as worksUpdateService, controller as worksUpdateController };
