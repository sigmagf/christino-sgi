import { Router } from 'express';

import { authMiddleware } from '~/middlewares/auth.middleware';

import { worksCreateController } from './create';
import { worksListController } from './list';
import { worksUpdateController } from './update';

const routerWorks = Router();

routerWorks.get('/works', authMiddleware, (req, res) => worksListController.handle(req, res));
// worksRouter.get('/works/:id', authMiddleware, (req, res) => worksFindController.handle(req, res));
routerWorks.post('/works', authMiddleware, (req, res) => worksCreateController.handle(req, res));
routerWorks.put('/works/:id', authMiddleware, (req, res) => worksUpdateController.handle(req, res));
// worksRouter.delete('/works/:id', authMiddleware, (req, res) => worksDeleteController.handle(req, res));

export { routerWorks };
