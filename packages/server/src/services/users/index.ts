import { Router } from 'express';

import { usersAuthController } from './auth';
import { usersCreateController } from './create';
import { usersDeleteController } from './delete';
import { usersFindController } from './find';
import { usersForgotPasswordController } from './forgotPassword';
import { usersListController } from './list';
import { usersResetPasswordController } from './resetPassword';
import { usersUpdateController } from './update';

const routerUsers = Router();

routerUsers.post('/users/login', (req, res) => usersAuthController.handle(req, res));
routerUsers.post('/users/forgotPassword', (req, res) => usersForgotPasswordController.handle(req, res));
routerUsers.post('/users/resetPassword', (req, res) => usersResetPasswordController.handle(req, res));
routerUsers.use('/users/valid', (req, res) => res.status(200).json(req.user));

routerUsers.get('/users', (req, res) => usersListController.handle(req, res));
routerUsers.get('/users/:id', (req, res) => usersFindController.handle(req, res));
routerUsers.post('/users', (req, res) => usersCreateController.handle(req, res));
routerUsers.put('/users/:id', (req, res) => usersUpdateController.handle(req, res));
routerUsers.delete('/users/:id', (req, res) => usersDeleteController.handle(req, res));

export { routerUsers };
