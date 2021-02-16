import { SequelizeWorksRepository } from '~/repositories/implementations/SequelizeWorksRepository';

import { WorksCreateController } from './controller';
import { WorksCreateService } from './service';

const repository = new SequelizeWorksRepository();

const service = new WorksCreateService(repository);
const controller = new WorksCreateController(service);

export { service as worksCreateService, controller as worksCreateController };
