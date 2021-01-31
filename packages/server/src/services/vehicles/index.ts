import AWS from 'aws-sdk';
import { Router } from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';

import { multerConfig } from '~/config/multer';
import { authMiddleware } from '~/middlewares/auth.middleware';

import { vehiclesCreateController } from './create';
import { vehiclesDeleteController } from './delete';
import { vehiclesFindController, vehiclesFindService } from './find';
import { vehiclesImportController } from './import';
import { vehiclesListController } from './list';
import { vehiclesUpdateController, vehiclesUpdateService } from './update';

const vehiclesRouter = Router();

vehiclesRouter.use(authMiddleware);

vehiclesRouter.get('/vehicles', (req, res) => vehiclesListController.handle(req, res));
vehiclesRouter.get('/vehicles/:id', (req, res) => vehiclesFindController.handle(req, res));
vehiclesRouter.post('/vehicles', (req, res) => vehiclesCreateController.handle(req, res));
vehiclesRouter.put('/vehicles/:id', (req, res) => vehiclesUpdateController.handle(req, res));
vehiclesRouter.delete('/vehicles/:id', (req, res) => vehiclesDeleteController.handle(req, res));

vehiclesRouter.post('/vehicles/import', (req, res) => vehiclesImportController.handle(req, res));

// eslint-disable-next-line consistent-return
vehiclesRouter.get('/vehicles/crlve/view/:id', async (req, res) => {
  if(req.user && req.user.desp_permission < 1) {
    return res.status(401).json({ message: 'User not have permission for this route.' });
  }

  if((await vehiclesFindService.execute({ id: req.params.id })).crlve_included) {
    const basePath = path.resolve(__dirname, '..', '..', '..', 'tmp');
    if(process.env.MULTER_STORAGE === 'local') {
      return res.sendFile(path.resolve(basePath, 'crlve', `${req.params.id}.pdf`));
    }

    const s3Path = path.resolve(basePath, 's3', `${req.params.id}.pdf`);
    const s3Key = process.env.NODE_ENV === 'development' ? `development/${req.params.id}.pdf` : `crlve/${req.params.id}.pdf`;

    const s3 = new AWS.S3();
    const fileTemp = fs.createWriteStream(s3Path);
    const s3Stream = s3.getObject({ Bucket: process.env.AWS_BUCKET, Key: s3Key }).createReadStream();

    s3Stream.on('error', (err) => res.status(400).json({ message: err.message || 'Unexpected error' }));
    s3Stream.pipe(fileTemp).on('error', (err) => res.status(400).json({ message: err.message || 'Unexpected error' })).on('close', () => res.sendFile(s3Path));
  } else {
    return res.status(404).json({ message: 'No CRLVe founded!' });
  }
});
vehiclesRouter.post('/vehicles/crlve/upload/:id', multer(multerConfig).single('file'), async (req, res) => {
  if(req.user && req.user.desp_permission < 2) {
    return res.status(401).json({ message: 'User not have permission for this route.' });
  }

  await vehiclesUpdateService.execute({ id: req.params.id, crlve_included: true });

  return res.end();
});

export { vehiclesRouter };
