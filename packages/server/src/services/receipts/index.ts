import { Router } from 'express';

import { receiptsCreateController } from './create';
// import { usersDeleteController } from './delete';
// import { usersFindController } from './find';
import { receiptsListController } from './list';
// import { usersUpdateController } from './update';

const receiptsRouter = Router();

receiptsRouter.get('/', (req, res) => receiptsListController.handle(req, res));
// receiptsRouter.get('/:id', (req, res) => usersFindController.handle(req, res));
receiptsRouter.post('/', (req, res) => receiptsCreateController.handle(req, res));
// receiptsRouter.put('/:id', (req, res) => usersUpdateController.handle(req, res));
// receiptsRouter.delete('/:id', (req, res) => usersDeleteController.handle(req, res));

export { receiptsRouter };
