import { Router } from 'express';

import { crvsCreateController } from './create';
import { crvsDeleteController } from './delete';
import { crvsFindController } from './find';
import { crvsListController } from './list';
import { crvsUpdateController } from './update';

const crvsRouter = Router();

crvsRouter.get('/', (req, res) => crvsListController.handle(req, res));
crvsRouter.get('/:clientId/:vehicleId', (req, res) => crvsFindController.handle(req, res));
crvsRouter.post('/', (req, res) => crvsCreateController.handle(req, res));
crvsRouter.put('/:clientId/:vehicleId', (req, res) => crvsUpdateController.handle(req, res));
crvsRouter.delete('/:clientId/:vehicleId', (req, res) => crvsDeleteController.handle(req, res));

export { crvsRouter };
