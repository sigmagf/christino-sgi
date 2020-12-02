import { Router } from 'express';

import { receiptsCreateController } from './create';
import { receiptsDeleteController } from './delete';
import { receiptsFindController } from './find';
import { receiptsListController } from './list';
import { receiptsUpdateController } from './update';

const receiptsRouter = Router();

receiptsRouter.get('/', (req, res) => receiptsListController.handle(req, res));
receiptsRouter.get('/:clientId/:vehicleId', (req, res) => receiptsFindController.handle(req, res));
receiptsRouter.post('/', (req, res) => receiptsCreateController.handle(req, res));
receiptsRouter.put('/:clientId/:vehicleId', (req, res) => receiptsUpdateController.handle(req, res));
receiptsRouter.delete('/:clientId/:vehicleId', (req, res) => receiptsDeleteController.handle(req, res));

export { receiptsRouter };
