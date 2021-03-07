import { Router } from 'express';

import { authMiddleware } from '~/middlewares/auth.middleware';

import { usersAuthController } from './auth';
import { usersCreateController } from './create';
import { usersDeleteController } from './delete';
import { usersFindController } from './find';
import { usersListController } from './list';
import { usersResetPasswordController } from './resetPassword';
import { usersUpdateController } from './update';

const routerUsers = Router();

routerUsers.use('/users/valid', authMiddleware, (req, res) => res.status(200).json(req.user));
routerUsers.post('/users/login', (req, res) => usersAuthController.handle(req, res));
routerUsers.get('/users/:id/resetPasswordRequest', (req, res) => usersResetPasswordController.handle(req, res));

routerUsers.get('/users', authMiddleware, (req, res) => usersListController.handle(req, res));
routerUsers.get('/users/:id', authMiddleware, (req, res) => usersFindController.handle(req, res));
routerUsers.post('/users', authMiddleware, (req, res) => usersCreateController.handle(req, res));
routerUsers.put('/users/:id', authMiddleware, (req, res) => usersUpdateController.handle(req, res));
routerUsers.delete('/users/:id', authMiddleware, (req, res) => usersDeleteController.handle(req, res));

export { routerUsers };
