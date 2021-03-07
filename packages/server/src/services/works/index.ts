import { Router } from 'express';

import { worksCreateController } from './create';
import { worksListController } from './list';
import { worksUpdateController } from './update';

const routerWorks = Router();

routerWorks.get('/works', (req, res) => worksListController.handle(req, res));
// worksRouter.get('/works/:id', (req, res) => worksFindController.handle(req, res));
routerWorks.post('/works', (req, res) => worksCreateController.handle(req, res));
routerWorks.put('/works/:id', (req, res) => worksUpdateController.handle(req, res));
// worksRouter.delete('/works/:id', (req, res) => worksDeleteController.handle(req, res));

export { routerWorks };
