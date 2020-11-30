import { Router } from 'express';

import { vehiclesCreateController } from './create';
import { clientsDeleteController } from './delete';
import { clientsFindController } from './find';
import { clientsListController } from './list';
import { clientsUpdateController } from './update';

const clientsRouter = Router();

clientsRouter.get('/', (req, res) => clientsListController.handle(req, res));
clientsRouter.get('/:id', (req, res) => clientsFindController.handle(req, res));
clientsRouter.post('/', (req, res) => vehiclesCreateController.handle(req, res));
clientsRouter.put('/:id', (req, res) => clientsUpdateController.handle(req, res));
clientsRouter.delete('/:id', (req, res) => clientsDeleteController.handle(req, res));

export { clientsRouter };
