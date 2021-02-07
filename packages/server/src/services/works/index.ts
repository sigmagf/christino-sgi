import { Router } from 'express';

import { authMiddleware } from '~/middlewares/auth.middleware';
import { TypeORMWorksRepository } from '~/repositories/implementations/TypeORMWorksRepository';

import { worksCreateController } from './create';

const worksRouter = Router();

worksRouter.use(authMiddleware);

worksRouter.get('/works', async (req, res) => {
  const repo = new TypeORMWorksRepository();
  const works = await repo.list(1, 10, { pagination: true });

  return res.json(works);
});
// worksRouter.get('/works/:id', (req, res) => worksFindController.handle(req, res));
worksRouter.post('/works', (req, res) => worksCreateController.handle(req, res));
// worksRouter.put('/works/:id', (req, res) => worksUpdateController.handle(req, res));
// worksRouter.delete('/works/:id', (req, res) => worksDeleteController.handle(req, res));

export { worksRouter };
