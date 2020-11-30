import { Router } from 'express';

import { vehiclesCreateController } from './create';
import { vehiclesDeleteController } from './delete';
import { vehiclesFindController } from './find';
import { vehiclesListController } from './list';
import { clientsUpdateController } from './update';

const vehiclesRouter = Router();

vehiclesRouter.get('/', (req, res) => vehiclesListController.handle(req, res));
vehiclesRouter.get('/:id', (req, res) => vehiclesFindController.handle(req, res));
vehiclesRouter.post('/', (req, res) => vehiclesCreateController.handle(req, res));
vehiclesRouter.put('/:id', (req, res) => clientsUpdateController.handle(req, res));
vehiclesRouter.delete('/:id', (req, res) => vehiclesDeleteController.handle(req, res));

export { vehiclesRouter };
