import { SequelizeWorksRepository } from '~/repositories/implementations/SequelizeWorksRepository';

import { WorksFindController } from './controller';
import { WorksFindService } from './service';

const repository = new SequelizeWorksRepository();

const service = new WorksFindService(repository);
const controller = new WorksFindController(service);

export { service as vehiclesFindService, controller as vehiclesFindController };
