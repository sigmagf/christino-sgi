import { Router } from 'express';

import { authMiddleware } from '~/middlewares/auth.middleware';

import { worksListController } from './list';

const worksRouter = Router();

worksRouter.use(authMiddleware);

worksRouter.get('/works', (req, res) => worksListController.handle(req, res));
// worksRouter.get('/works/:id', (req, res) => worksFindController.handle(req, res));
// worksRouter.post('/works', (req, res) => worksCreateController.handle(req, res));
// worksRouter.put('/works/:id', (req, res) => worksUpdateController.handle(req, res));
// worksRouter.delete('/works/:id', (req, res) => worksDeleteController.handle(req, res));

export { worksRouter };
