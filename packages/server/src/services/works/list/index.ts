import { TypeORMWorksRepository } from '~/repositories/implementations/TypeORMWorksRepository';

import { WorksListController } from './controller';
import { WorksListService } from './service';

const repository = new TypeORMWorksRepository();

const service = new WorksListService(repository);
const controller = new WorksListController(service);

export { service as worksListService, controller as worksListController };
