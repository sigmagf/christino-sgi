import { Router } from 'express';

import { vehiclesCreateController } from './create';
import { vehiclesDeleteController } from './delete';
import { vehiclesFindController } from './find';
import { vehiclesImportController } from './import';
import { vehiclesListController } from './list';
import { vehiclesUpdateController } from './update';

const vehiclesRouter = Router();

vehiclesRouter.get('/vehicles', (req, res) => vehiclesListController.handle(req, res));
vehiclesRouter.get('/vehicles/:id', (req, res) => vehiclesFindController.handle(req, res));
vehiclesRouter.post('/vehicles', (req, res) => vehiclesCreateController.handle(req, res));
vehiclesRouter.put('/vehicles/:id', (req, res) => vehiclesUpdateController.handle(req, res));
vehiclesRouter.delete('/vehicles/:id', (req, res) => vehiclesDeleteController.handle(req, res));

vehiclesRouter.post('/vehicles/import', (req, res) => vehiclesImportController.handle(req, res));

export { vehiclesRouter };
