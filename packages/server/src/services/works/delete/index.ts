import { TypeORMWorksRepository } from '~/repositories/implementations/TypeORMWorksRepository';

import { WorksDeleteController } from './controller';
import { WorksDeleteService } from './service';

const repository = new TypeORMWorksRepository();

const service = new WorksDeleteService(repository);
const controller = new WorksDeleteController(service);

export { service as worksDeleteService, controller as worksDeleteController };
