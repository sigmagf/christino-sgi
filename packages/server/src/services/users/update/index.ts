import { PrismaUsersRepository } from '~/repositories/implementations/PrismaUsersRepository';

import { UsersUpdateController } from './controller';
import { UsersUpdateService } from './service';

const repository = new PrismaUsersRepository();
const service = new UsersUpdateService(repository);
const controller = new UsersUpdateController(service);

export { controller as usersUpdateController, service as usersUpdateSerivce };
