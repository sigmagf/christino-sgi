import { SequelizeUsersRepository } from '~/repositories/implementations/SequelizeUsersRepository';

import { UsersResetPasswordController } from './controller';
import { UsersResetPasswordService } from './service';

const repository = new SequelizeUsersRepository();
const service = new UsersResetPasswordService(repository);
const controller = new UsersResetPasswordController(service);

export { service as usersResetPasswordService, controller as usersResetPasswordController };
