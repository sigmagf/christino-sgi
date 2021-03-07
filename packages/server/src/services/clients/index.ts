import { Router } from 'express';

import { authMiddleware } from '~/middlewares/auth.middleware';

import { clientsCreateController } from './create';
import { clientsDeleteController } from './delete';
import { clientsFindController } from './find';
import { clientsListController } from './list';
import { clientsListGroupsController } from './listGroups';
import { clientsUpdateController } from './update';

const routerClients = Router();

routerClients.get('/clients', authMiddleware, (req, res) => clientsListController.handle(req, res));
routerClients.get('/clients/groups', authMiddleware, (req, res) => clientsListGroupsController.handle(req, res));
routerClients.get('/clients/:param', authMiddleware, (req, res) => clientsFindController.handle(req, res));
routerClients.post('/clients', authMiddleware, (req, res) => clientsCreateController.handle(req, res));
routerClients.put('/clients/:id', authMiddleware, (req, res) => clientsUpdateController.handle(req, res));
routerClients.delete('/clients/:id', authMiddleware, (req, res) => clientsDeleteController.handle(req, res));

export { routerClients };
