import { PrismaUsersRepository } from '~/repositories/implementations/PrismaUsersRepository';

import { UsersListController } from './controller';
import { UsersListService } from './service';

const repository = new PrismaUsersRepository();
const service = new UsersListService(repository);
const controller = new UsersListController(service);

export { controller as usersListController, service as usersListSerivce };
