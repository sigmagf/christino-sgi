import { PrismaCRVsRepository } from '~/repositories/implementations/PrismaCRVsRepository';

import { ReceiptsDeleteController } from './controller';
import { ReceiptsDeleteService } from './service';

const repository = new PrismaCRVsRepository();
const service = new ReceiptsDeleteService(repository);
const controller = new ReceiptsDeleteController(service);

export { controller as receiptsDeleteController, service as receiptsDeleteSerivce };
