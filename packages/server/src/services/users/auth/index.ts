import { TypeORMUsersRepository } from '~/repositories/implementations/TypeORMUsersRepository';

import { UsersAuthController } from './controller';
import { UsersAuthService } from './service';

const repository = new TypeORMUsersRepository();

const service = new UsersAuthService(repository);
const controller = new UsersAuthController(service);

export { service as usersAuthService, controller as usersAuthController };
