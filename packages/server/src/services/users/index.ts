import { Router } from 'express';

import { usersAuthController } from './auth';
import { usersCreateController } from './create';
import { usersDeleteController } from './delete';
import { usersFindController } from './find';
import { usersListController } from './list';
import { usersUpdateController } from './update';

const usersRouter = Router();

usersRouter.get('/users', (req, res) => usersListController.handle(req, res));
usersRouter.get('/users/:id', (req, res) => usersFindController.handle(req, res));
usersRouter.post('/users', (req, res) => usersCreateController.handle(req, res));
usersRouter.put('/users/:id', (req, res) => usersUpdateController.handle(req, res));
usersRouter.delete('/users/:id', (req, res) => usersDeleteController.handle(req, res));

usersRouter.post('/users/auth', (req, res) => usersAuthController.handle(req, res));

export { usersRouter };
