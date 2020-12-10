import { PrismaCRVsRepository } from '~/repositories/implementations/PrismaCRVsRepository';

import { ReceiptsListController } from './controller';
import { ReceiptsListService } from './service';

const repository = new PrismaCRVsRepository();
const service = new ReceiptsListService(repository);
const controller = new ReceiptsListController(service);

export { controller as receiptsListController, service as receiptsListSerivce };
