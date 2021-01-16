import { Router } from 'express';

import { clientsCreateController } from './create';
import { clientsDeleteController } from './delete';
import { clientsFindController } from './find';
import { clientsListController } from './list';
import { clientsUpdateController } from './update';

const clientsRouter = Router();

clientsRouter.get('/clients', (req, res) => clientsListController.handle(req, res));
clientsRouter.get('/clients/:id', (req, res) => clientsFindController.handle(req, res));
clientsRouter.post('/clients', (req, res) => clientsCreateController.handle(req, res));
clientsRouter.put('/clients/:id', (req, res) => clientsUpdateController.handle(req, res));
clientsRouter.delete('/clients/:id', (req, res) => clientsDeleteController.handle(req, res));

export { clientsRouter };
