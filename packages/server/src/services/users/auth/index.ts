import { SequelizeUsersRepository } from '~/repositories/implementations/SequelizeUsersRepository';

import { UsersAuthController } from './controller';
import { UsersAuthService } from './service';

const repository = new SequelizeUsersRepository();
const service = new UsersAuthService(repository);
const controller = new UsersAuthController(service);

export { service as usersAuthService, controller as usersAuthController };
