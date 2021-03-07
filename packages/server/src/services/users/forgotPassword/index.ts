import { SequelizeUsersRepository } from '~/repositories/implementations/SequelizeUsersRepository';

import { UsersForgotPasswordController } from './controller';
import { UsersForgotPasswordService } from './service';

const repository = new SequelizeUsersRepository();
const service = new UsersForgotPasswordService(repository);
const controller = new UsersForgotPasswordController(service);

export { service as usersForgotPasswordService, controller as usersForgotPasswordController };
