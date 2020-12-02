import { PrismaReceiptsRepository } from '~/repositories/implementations/PrismaReceiptsRepository';

import { ReceiptsFindController } from './controller';
import { ReceiptsFindService } from './service';

const repository = new PrismaReceiptsRepository();
const service = new ReceiptsFindService(repository);
const controller = new ReceiptsFindController(service);

export { controller as receiptsFindController, service as receiptsFindSerivce };
