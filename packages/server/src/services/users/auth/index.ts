import { PrismaUsersRepository } from '~/repositories/implementations/PrismaUsersRepository';

import { UsersAuthController } from './controller';
import { UsersAuthService } from './service';

const repository = new PrismaUsersRepository();
const service = new UsersAuthService(repository);
const controller = new UsersAuthController(service);

export { controller as usersAuthController, service as usersAuthSerivce };
