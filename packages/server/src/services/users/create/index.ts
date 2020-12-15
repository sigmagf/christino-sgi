import { PrismaUsersRepository } from '~/repositories/implementations/PrismaUsersRepository';

import { UsersCreateController } from './controller';
import { UsersCreateService } from './service';

const repository = new PrismaUsersRepository();
const service = new UsersCreateService(repository);
const controller = new UsersCreateController(service);

export { controller as usersCreateController, service as usersCreateSerivce };
