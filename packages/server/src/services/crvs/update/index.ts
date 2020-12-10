import { PrismaCRVsRepository } from '~/repositories/implementations/PrismaCRVsRepository';

import { ReceiptsUpdateController } from './controller';
import { ReceiptsUpdateService } from './service';

const receipts = new PrismaCRVsRepository();
const service = new ReceiptsUpdateService(receipts);
const controller = new ReceiptsUpdateController(service);

export { controller as receiptsUpdateController, service as receiptsUpdateSerivce };
