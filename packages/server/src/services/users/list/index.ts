import { SequelizeUsersRepository } from '~/repositories/implementations/SequelizeUsersRepository';

import { UsersListController } from './controller';
import { UsersListService } from './service';

const repository = new SequelizeUsersRepository();
const service = new UsersListService(repository);
const controller = new UsersListController(service);

export { service as usersListService, controller as usersListController };
