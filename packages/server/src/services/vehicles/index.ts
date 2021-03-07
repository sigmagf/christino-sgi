import { NextFunction, Request, Response, Router } from 'express';
import multer from 'multer';

import { multerConfigCRLVe } from '~/config/multerConfigCRLVe';
import { multerConfigWithdrawal } from '~/config/multerConfigWithdrawal';
import { errorWork } from '~/utils/errorWork';

import { vehiclesCreateController } from './create';
import { vehiclesDeleteController } from './delete';
import { vehiclesFindController, vehiclesFindService } from './find';
import { vehiclesListController } from './list';
import { vehiclesUpdateController } from './update';
import { vehiclesUploadCRLVeController } from './uploadCRLVe';
import { vehiclesUploadWithdrawalController } from './uploadWithdrawal';
import { vehiclesViewCRLVeController } from './viewCRLVe';
import { vehiclesViewWithdrawalController } from './viewWithdrawal';

const routerVehicles = Router();

const checkExists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if(!await vehiclesFindService.execute({ id: req.params.id })) {
      throw new Error(JSON.stringify({ code: 404, message: 'Veículo não encontrado.', details: null }));
    }

    return next();
  } catch(err) {
    return errorWork(req, res, err);
  }
};

routerVehicles.get('/vehicles', (req, res) => vehiclesListController.handle(req, res));
routerVehicles.get('/vehicles/:id', (req, res) => vehiclesFindController.handle(req, res));
routerVehicles.post('/vehicles', (req, res) => vehiclesCreateController.handle(req, res));
routerVehicles.put('/vehicles/:id', (req, res) => vehiclesUpdateController.handle(req, res));
routerVehicles.delete('/vehicles/:id', (req, res) => vehiclesDeleteController.handle(req, res));

routerVehicles.get('/vehicles/:id/crlve', (req, res) => vehiclesViewCRLVeController.handle(req, res));
routerVehicles.post('/vehicles/:id/crlve', checkExists, multer(multerConfigCRLVe).single('file'), (req, res) => vehiclesUploadCRLVeController.handle(req, res));

routerVehicles.get('/vehicles/:id/withdrawal', (req, res) => vehiclesViewWithdrawalController.handle(req, res));
routerVehicles.post('/vehicles/:id/withdrawal', checkExists, multer(multerConfigWithdrawal).single('file'), (req, res) => vehiclesUploadWithdrawalController.handle(req, res));

export { routerVehicles };
