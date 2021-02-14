import { SequelizeUsersRepository } from '~/repositories/implementations/SequelizeUsersRepository';

import { UsersDeleteController } from './controller';
import { UsersDeleteService } from './service';

const repository = new SequelizeUsersRepository();
const service = new UsersDeleteService(repository);
const controller = new UsersDeleteController(service);

export { service as usersDeleteService, controller as usersDeleteController };
