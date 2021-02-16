import { SequelizeWorksRepository } from '~/repositories/implementations/SequelizeWorksRepository';

import { WorksUpdateController } from './controller';
import { WorksUpdateService } from './service';

const repository = new SequelizeWorksRepository();

const service = new WorksUpdateService(repository);
const controller = new WorksUpdateController(service);

export { service as worksUpdateService, controller as worksUpdateController };
