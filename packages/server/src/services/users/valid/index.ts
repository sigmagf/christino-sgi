import { TypeORMUsersRepository } from '~/repositories/implementations/TypeORMUsersRepository';

import { UsersValidController } from './controller';
import { UsersValidService } from './service';

const repository = new TypeORMUsersRepository();

const service = new UsersValidService(repository);
const controller = new UsersValidController(service);

export { service as usersValidService, controller as usersValidController };
