import { Router } from 'express';

import { crvsCreateController } from './create';
import { crvsDeleteController } from './delete';
import { crvsFindController } from './find';
import { crvsListController } from './list';
import { crvsUpdateController } from './update';

const crvsRepositoryRouter = Router();

crvsRepositoryRouter.get('/', (req, res) => crvsListController.handle(req, res));
crvsRepositoryRouter.get('/:clientId/:vehicleId', (req, res) => crvsFindController.handle(req, res));
crvsRepositoryRouter.post('/', (req, res) => crvsCreateController.handle(req, res));
crvsRepositoryRouter.put('/:clientId/:vehicleId', (req, res) => crvsUpdateController.handle(req, res));
crvsRepositoryRouter.delete('/:clientId/:vehicleId', (req, res) => crvsDeleteController.handle(req, res));

export { crvsRepositoryRouter };
