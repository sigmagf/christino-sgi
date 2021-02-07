import { Router } from 'express';

import { authMiddleware } from '~/middlewares/auth.middleware';

import { worksCreateController } from './create';
import { worksDeleteController } from './delete';
import { worksFindController } from './find';
import { worksListController } from './list';
import { worksUpdateController } from './update';

const worksRouter = Router();

worksRouter.get('/works', authMiddleware, (req, res) => worksListController.handle(req, res));
worksRouter.get('/works/:id', authMiddleware, (req, res) => worksFindController.handle(req, res));
worksRouter.post('/works', authMiddleware, (req, res) => worksCreateController.handle(req, res));
worksRouter.put('/works/:id', authMiddleware, (req, res) => worksUpdateController.handle(req, res));
worksRouter.delete('/works/:id', authMiddleware, (req, res) => worksDeleteController.handle(req, res));

export { worksRouter };
