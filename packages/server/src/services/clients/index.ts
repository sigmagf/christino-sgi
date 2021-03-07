import { Router } from 'express';

import { clientsCreateController } from './create';
import { clientsDeleteController } from './delete';
import { clientsFindController } from './find';
import { clientsListController } from './list';
import { clientsListGroupsController } from './listGroups';
import { clientsUpdateController } from './update';

const routerClients = Router();

routerClients.get('/clients', (req, res) => clientsListController.handle(req, res));
routerClients.get('/clients/groups', (req, res) => clientsListGroupsController.handle(req, res));
routerClients.get('/clients/:param', (req, res) => clientsFindController.handle(req, res));
routerClients.post('/clients', (req, res) => clientsCreateController.handle(req, res));
routerClients.put('/clients/:id', (req, res) => clientsUpdateController.handle(req, res));
routerClients.delete('/clients/:id', (req, res) => clientsDeleteController.handle(req, res));

export { routerClients };
