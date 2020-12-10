import { Router } from 'express';

import { receiptsCreateController } from './create';
import { receiptsDeleteController } from './delete';
import { receiptsFindController } from './find';
import { receiptsListController } from './list';
import { receiptsUpdateController } from './update';

const crvsRepositoryRouter = Router();

crvsRepositoryRouter.get('/', (req, res) => receiptsListController.handle(req, res));
crvsRepositoryRouter.get('/:clientId/:vehicleId', (req, res) => receiptsFindController.handle(req, res));
crvsRepositoryRouter.post('/', (req, res) => receiptsCreateController.handle(req, res));
crvsRepositoryRouter.put('/:clientId/:vehicleId', (req, res) => receiptsUpdateController.handle(req, res));
crvsRepositoryRouter.delete('/:clientId/:vehicleId', (req, res) => receiptsDeleteController.handle(req, res));

export { crvsRepositoryRouter };
