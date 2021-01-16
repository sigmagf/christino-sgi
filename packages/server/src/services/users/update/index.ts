import { TypeORMUsersRepository } from '~/repositories/implementations/TypeORMUsersRepository';

import { UsersUpdateController } from './controller';
import { UsersUpdateService } from './service';

const repository = new TypeORMUsersRepository();

const service = new UsersUpdateService(repository);
const controller = new UsersUpdateController(service);

export { service as usersUpdateService, controller as usersUpdateController };
