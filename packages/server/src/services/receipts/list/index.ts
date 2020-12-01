import { PrismaReceiptsRepository } from '~/repositories/implementations/PrismaReceiptsRepository';

import { ReceiptsListController } from './controller';
import { ReceiptsListService } from './service';

const repository = new PrismaReceiptsRepository();
const service = new ReceiptsListService(repository);
const controller = new ReceiptsListController(service);

export { controller as receiptsListController, service as receiptsListSerivce };
