import { NextFunction, Request, Response, Router } from 'express';
import multer from 'multer';

import { multerConfigCRLVe } from '~/config/multerConfigCRLVe';
import { multerConfigWithdrawal } from '~/config/multerConfigWithdrawal';
import { authMiddleware } from '~/middlewares/auth.middleware';
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

const check = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if(!await vehiclesFindService.execute({ id: req.params.id })) {
      throw new Error(JSON.stringify({ code: 404, message: 'Veículo não encontrado.', details: null }));
    }

    return next();
  } catch(err) {
    return errorWork(res, err);
  }
};

routerVehicles.get('/vehicles', authMiddleware, (req, res) => vehiclesListController.handle(req, res));
routerVehicles.get('/vehicles/:id', authMiddleware, (req, res) => vehiclesFindController.handle(req, res));
routerVehicles.post('/vehicles', authMiddleware, (req, res) => vehiclesCreateController.handle(req, res));
routerVehicles.put('/vehicles/:id', authMiddleware, (req, res) => vehiclesUpdateController.handle(req, res));
routerVehicles.delete('/vehicles/:id', authMiddleware, (req, res) => vehiclesDeleteController.handle(req, res));

routerVehicles.get('/vehicles/:id/crlve', authMiddleware, (req, res) => vehiclesViewCRLVeController.handle(req, res));
routerVehicles.post('/vehicles/:id/crlve', check, multer(multerConfigCRLVe).single('file'), authMiddleware, (req, res) => vehiclesUploadCRLVeController.handle(req, res));

routerVehicles.get('/vehicles/:id/withdrawal', authMiddleware, (req, res) => vehiclesViewWithdrawalController.handle(req, res));
routerVehicles.post('/vehicles/:id/withdrawal', check, multer(multerConfigWithdrawal).single('file'), authMiddleware, (req, res) => vehiclesUploadWithdrawalController.handle(req, res));

export { routerVehicles };
