import { TypeORMWorksRepository } from '~/repositories/implementations/TypeORMWorksRepository';

import { WorksFindController } from './controller';
import { WorksFindService } from './service';

const repository = new TypeORMWorksRepository();

const service = new WorksFindService(repository);
const controller = new WorksFindController(service);

export { service as worksFindService, controller as worksFindController };
