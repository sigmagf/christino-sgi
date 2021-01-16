import { TypeORMUsersRepository } from '~/repositories/implementations/TypeORMUsersRepository';

import { UsersListController } from './controller';
import { UsersListService } from './service';

const repository = new TypeORMUsersRepository();

const service = new UsersListService(repository);
const controller = new UsersListController(service);

export { service as usersListService, controller as usersListController };
