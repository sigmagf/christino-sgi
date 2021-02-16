import { SequelizeUsersRepository } from '~/repositories/implementations/SequelizeUsersRepository';

import { UsersUpdateController } from './controller';
import { UsersUpdateService } from './service';

const repository = new SequelizeUsersRepository();
const service = new UsersUpdateService(repository);
const controller = new UsersUpdateController(service);

export { service as usersUpdateService, controller as usersUpdateController };
