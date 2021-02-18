import { NextFunction, Request, Response, Router } from 'express';
import multer from 'multer';

import { multerConfigCRLVe } from '~/config/multerConfigCRLVe';
import { authMiddleware } from '~/middlewares/auth.middleware';
import { errorWork } from '~/utils/errorWork';

import { vehiclesCreateController } from './create';
import { vehiclesDeleteController } from './delete';
import { vehiclesFindController, vehiclesFindService } from './find';
import { vehiclesListController } from './list';
import { vehiclesUpdateController } from './update';
import { vehiclesUploadCRLVeController } from './uploadCRLVe';
import { vehiclesViewCRLVeController } from './viewCRLVe';

const vehiclesRouter = Router();

const verifyVehicle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if(!await vehiclesFindService.execute({ id: req.params.id })) {
      throw new Error(JSON.stringify({ code: 404, message: 'Veículo não encontrado.', details: null }));
    }

    return next();
  } catch(err) {
    return errorWork(res, err.message);
  }
};

vehiclesRouter.use(authMiddleware);

vehiclesRouter.get('/vehicles', (req, res) => vehiclesListController.handle(req, res));
vehiclesRouter.get('/vehicles/:id', (req, res) => vehiclesFindController.handle(req, res));
vehiclesRouter.post('/vehicles', (req, res) => vehiclesCreateController.handle(req, res));
vehiclesRouter.put('/vehicles/:id', (req, res) => vehiclesUpdateController.handle(req, res));
vehiclesRouter.delete('/vehicles/:id', (req, res) => vehiclesDeleteController.handle(req, res));

// vehiclesRouter.post('/vehicles/import', (req, res) => vehiclesImportController.handle(req, res));

vehiclesRouter.get('/vehicles/:id/crlve', (req, res) => vehiclesViewCRLVeController.handle(req, res));
vehiclesRouter.post('/vehicles/:id/crlve', verifyVehicle, multer(multerConfigCRLVe).single('file'), (req, res) => vehiclesUploadCRLVeController.handle(req, res));

export { vehiclesRouter };
