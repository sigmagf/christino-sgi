import { Router } from 'express';

import { usersCreateController } from './create';
import { usersDeleteController } from './delete';
import { usersFindController } from './find';
import { usersListController } from './list';
import { usersUpdateController } from './update';

const usersRouter = Router();

usersRouter.get('/', (req, res) => usersListController.handle(req, res));
usersRouter.post('/', (req, res) => usersCreateController.handle(req, res));
usersRouter.get('/:id', (req, res) => usersFindController.handle(req, res));
usersRouter.put('/:id', (req, res) => usersUpdateController.handle(req, res));
usersRouter.delete('/:id', (req, res) => usersDeleteController.handle(req, res));

export { usersRouter };
