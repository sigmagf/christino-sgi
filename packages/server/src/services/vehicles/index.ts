import { Router } from 'express';
import multer from 'multer';

import { multerConfig } from '~/config/multer';
import { authMiddleware } from '~/middlewares/auth.middleware';

import { vehiclesCreateController } from './create';
import { vehiclesDeleteController } from './delete';
import { vehiclesFindController } from './find';
import { vehiclesImportController } from './import';
import { vehiclesListController } from './list';
import { vehiclesUpdateController } from './update';
import { vehiclesUploadCRLVeController } from './uploadCRLVe';
import { vehiclesViewCRLVeController } from './viewCRLVe';

const vehiclesRouter = Router();

vehiclesRouter.use(authMiddleware);

vehiclesRouter.get('/vehicles', (req, res) => vehiclesListController.handle(req, res));
vehiclesRouter.get('/vehicles/:id', (req, res) => vehiclesFindController.handle(req, res));
vehiclesRouter.post('/vehicles', (req, res) => vehiclesCreateController.handle(req, res));
vehiclesRouter.put('/vehicles/:id', (req, res) => vehiclesUpdateController.handle(req, res));
vehiclesRouter.delete('/vehicles/:id', (req, res) => vehiclesDeleteController.handle(req, res));

vehiclesRouter.post('/vehicles/import', (req, res) => vehiclesImportController.handle(req, res));

vehiclesRouter.get('/vehicles/crlve/view/:id', (req, res) => vehiclesViewCRLVeController.handle(req, res));
vehiclesRouter.post('/vehicles/crlve/upload/:id', multer(multerConfig).single('file'), (req, res) => vehiclesUploadCRLVeController.handle(req, res));

export { vehiclesRouter };
