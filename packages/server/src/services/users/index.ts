import { Router } from 'express';

import { usersCreateController } from './create';
import { usersFindByIdController } from './findById';
import { usersListController } from './list';

const usersRouter = Router();

usersRouter.get('/', (req, res) => usersListController.handle(req, res));
usersRouter.post('/', (req, res) => usersCreateController.handle(req, res));
usersRouter.get('/:id', (req, res) => usersFindByIdController.handle(req, res));

export { usersRouter };
