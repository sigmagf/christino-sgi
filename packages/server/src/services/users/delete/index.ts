import { TypeORMUsersRepository } from '~/repositories/implementations/TypeORMUsersRepository';

import { UsersDeleteController } from './controller';
import { UsersDeleteService } from './service';

const repository = new TypeORMUsersRepository();

const service = new UsersDeleteService(repository);
const controller = new UsersDeleteController(service);

export { service as usersDeleteService, controller as usersDeleteController };
