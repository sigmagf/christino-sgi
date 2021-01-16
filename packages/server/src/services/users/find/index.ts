import { TypeORMUsersRepository } from '~/repositories/implementations/TypeORMUsersRepository';

import { UsersFindController } from './controller';
import { UsersFindService } from './service';

const repository = new TypeORMUsersRepository();

const service = new UsersFindService(repository);
const controller = new UsersFindController(service);

export { service as usersFindService, controller as usersFindController };
