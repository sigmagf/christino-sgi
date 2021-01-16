import { TypeORMUsersRepository } from '~/repositories/implementations/TypeORMUsersRepository';

import { UsersCreateController } from './controller';
import { UsersCreateService } from './service';

const repository = new TypeORMUsersRepository();

const service = new UsersCreateService(repository);
const controller = new UsersCreateController(service);

export { service as usersCreateService, controller as usersCreateController };
