import { PrismaUsersRepository } from '~/repositories/implementations/PrismaUsersRepository';

import { UsersDeleteController } from './controller';
import { UsersDeleteService } from './service';

const repository = new PrismaUsersRepository();
const service = new UsersDeleteService(repository);
const controller = new UsersDeleteController(service);

export { controller as usersDeleteController, service as usersDeleteSerivce };
