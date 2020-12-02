import { PrismaReceiptsRepository } from '~/repositories/implementations/PrismaReceiptsRepository';

import { ReceiptsDeleteController } from './controller';
import { ReceiptsDeleteService } from './service';

const repository = new PrismaReceiptsRepository();
const service = new ReceiptsDeleteService(repository);
const controller = new ReceiptsDeleteController(service);

export { controller as receiptsDeleteController, service as receiptsDeleteSerivce };
