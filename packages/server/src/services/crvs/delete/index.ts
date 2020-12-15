import { PrismaCRVsRepository } from '~/repositories/implementations/PrismaCRVsRepository';

import { CRVsDeleteController } from './controller';
import { CRVsDeleteService } from './service';

const repository = new PrismaCRVsRepository();
const service = new CRVsDeleteService(repository);
const controller = new CRVsDeleteController(service);

export { controller as crvsDeleteController, service as crvsDeleteSerivce };
