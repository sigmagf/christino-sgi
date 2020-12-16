import { Router } from 'express';

import { clientsCreateController } from './create';
import { clientsDeleteController } from './delete';
import { clientsFindController } from './find';
import { clientsListController } from './list';
import { clientsUpdateController } from './update';

const worksRouter = Router();

worksRouter.get('/', (req, res) => clientsListController.handle(req, res));
worksRouter.get('/:id', (req, res) => clientsFindController.handle(req, res));
worksRouter.post('/', (req, res) => clientsCreateController.handle(req, res));
worksRouter.put('/:id', (req, res) => clientsUpdateController.handle(req, res));
worksRouter.delete('/:id', (req, res) => clientsDeleteController.handle(req, res));

export { worksRouter };
