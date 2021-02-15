import { SequelizeWorksRepository } from '~/repositories/implementations/SequelizeWorksRepository';

import { WorksListController } from './controller';
import { WorksListService } from './service';

const repository = new SequelizeWorksRepository();

const service = new WorksListService(repository);
const controller = new WorksListController(service);

export { service as worksListService, controller as worksListController };
