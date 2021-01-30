import { Router } from 'express';

import { authMiddleware } from '~/middlewares/auth.middleware';

import { usersAuthController } from './auth';
import { usersCreateController } from './create';
import { usersDeleteController } from './delete';
import { usersFindController } from './find';
import { usersListController } from './list';
import { usersUpdateController } from './update';
import { usersValidController } from './valid';

const usersRouter = Router();

usersRouter.use('/users/valid', authMiddleware, (req, res) => usersValidController.handle(req, res));
usersRouter.post('/users/auth', (req, res) => usersAuthController.handle(req, res));

usersRouter.get('/users', authMiddleware, (req, res) => usersListController.handle(req, res));
usersRouter.get('/users/:id', authMiddleware, (req, res) => usersFindController.handle(req, res));
usersRouter.post('/users', authMiddleware, (req, res) => usersCreateController.handle(req, res));
usersRouter.put('/users/:id', authMiddleware, (req, res) => usersUpdateController.handle(req, res));
usersRouter.delete('/users/:id', authMiddleware, (req, res) => usersDeleteController.handle(req, res));

export { usersRouter };
