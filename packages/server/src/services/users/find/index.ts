import { SequelizeUsersRepository } from '~/repositories/implementations/SequelizeUsersRepository';

import { UsersFindController } from './controller';
import { UsersFindService } from './service';

const repository = new SequelizeUsersRepository();
const service = new UsersFindService(repository);
const controller = new UsersFindController(service);

export { service as usersFindService, controller as usersFindController };
