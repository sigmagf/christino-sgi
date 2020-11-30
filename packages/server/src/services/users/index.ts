import { Router } from 'express';

import { usersCreateController } from './create';
import { usersFindController } from './find';
import { usersListController } from './list';

const usersRouter = Router();

usersRouter.get('/', (req, res) => usersListController.handle(req, res));
usersRouter.post('/', (req, res) => usersCreateController.handle(req, res));
usersRouter.get('/:id', (req, res) => usersFindController.handle(req, res));

export { usersRouter };
