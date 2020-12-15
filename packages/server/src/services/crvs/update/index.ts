import { PrismaCRVsRepository } from '~/repositories/implementations/PrismaCRVsRepository';

import { CRVsUpdateController } from './controller';
import { CRVsUpdateService } from './service';

const crvs = new PrismaCRVsRepository();
const service = new CRVsUpdateService(crvs);
const controller = new CRVsUpdateController(service);

export { controller as crvsUpdateController, service as crvsUpdateSerivce };
