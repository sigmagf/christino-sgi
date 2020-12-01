import { Router } from 'express';

import { authMiddleware } from '~/middlewares/auth.middleware';

import { usersAuthController } from './auth';
import { usersCreateController } from './create';
import { usersDeleteController } from './delete';
import { usersFindController } from './find';
import { usersListController } from './list';
import { usersUpdateController } from './update';

const usersRouter = Router();

usersRouter.post('/auth', (req, res) => usersAuthController.handle(req, res));
usersRouter.post('/', (req, res) => usersCreateController.handle(req, res));

usersRouter.get('/', authMiddleware, (req, res) => usersListController.handle(req, res));
usersRouter.get('/:id', authMiddleware, (req, res) => usersFindController.handle(req, res));
usersRouter.put('/:id', authMiddleware, (req, res) => usersUpdateController.handle(req, res));
usersRouter.delete('/:id', authMiddleware, (req, res) => usersDeleteController.handle(req, res));

export { usersRouter };
