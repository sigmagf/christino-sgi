import { PrismaCRVsRepository } from '~/repositories/implementations/PrismaCRVsRepository';

import { CRVsListController } from './controller';
import { CRVsListService } from './service';

const repository = new PrismaCRVsRepository();
const service = new CRVsListService(repository);
const controller = new CRVsListController(service);

export { controller as crvsListController, service as crvsListSerivce };
