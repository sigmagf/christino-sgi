import { PrismaReceiptsRepository } from '~/repositories/implementations/PrismaReceiptsRepository';

import { ReceiptsUpdateController } from './controller';
import { ReceiptsUpdateService } from './service';

const receipts = new PrismaReceiptsRepository();
const service = new ReceiptsUpdateService(receipts);
const controller = new ReceiptsUpdateController(service);

export { controller as receiptsUpdateController, service as receiptsUpdateSerivce };
