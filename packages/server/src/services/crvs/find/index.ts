import { PrismaCRVsRepository } from '~/repositories/implementations/PrismaCRVsRepository';

import { ReceiptsFindController } from './controller';
import { ReceiptsFindService } from './service';

const repository = new PrismaCRVsRepository();
const service = new ReceiptsFindService(repository);
const controller = new ReceiptsFindController(service);

export { controller as receiptsFindController, service as receiptsFindSerivce };
