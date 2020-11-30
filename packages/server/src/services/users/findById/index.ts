import { PrismaUsersRepository } from '~/repositories/implementations/PrismaUsersRepository';

import { UsersFindByIdController } from './controller';
import { UsersFindByIdService } from './service';

const repository = new PrismaUsersRepository();
const service = new UsersFindByIdService(repository);
const controller = new UsersFindByIdController(service);

export { controller as usersFindByIdController, service as usersFindByIdSerivce };
