import { PrismaUsersRepository } from '~/repositories/implementations/PrismaUsersRepository';

import { UsersFindController } from './controller';
import { UsersFindService } from './service';

const repository = new PrismaUsersRepository();
const service = new UsersFindService(repository);
const controller = new UsersFindController(service);

export { controller as usersFindController, service as usersFindSerivce };
