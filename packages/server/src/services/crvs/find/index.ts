import { PrismaCRVsRepository } from '~/repositories/implementations/PrismaCRVsRepository';

import { CRVsFindController } from './controller';
import { CRVsFindService } from './service';

const repository = new PrismaCRVsRepository();
const service = new CRVsFindService(repository);
const controller = new CRVsFindController(service);

export { controller as crvsFindController, service as crvsFindSerivce };
