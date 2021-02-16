import { SequelizeUsersRepository } from '~/repositories/implementations/SequelizeUsersRepository';

import { UsersCreateController } from './controller';
import { UsersCreateService } from './service';

const repository = new SequelizeUsersRepository();
const service = new UsersCreateService(repository);
const controller = new UsersCreateController(service);

export { service as usersCreateService, controller as usersCreateController };
