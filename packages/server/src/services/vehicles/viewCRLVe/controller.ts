import AWS from 'aws-sdk';
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

import { vehiclesFindService } from '../find';

export class VehiclesViewCRLVeController {
  constructor() { }

  // eslint-disable-next-line consistent-return
  async handle(req: Request, res: Response) {
    const vehicle = await vehiclesFindService.execute({ id: req.params.id });
    
    console.log(vehicle);
    
    if(vehicle.crlveIncluded) {
      let basePath = '';

      if(process.env.NODE_ENV !== 'development') {
        basePath = path.resolve(__dirname, '..', '..', '..', '..', '..', 'tmp');
      } else {
        basePath = path.resolve(__dirname, '..', '..', '..', '..', 'tmp');
      }

      if(process.env.MULTER_STORAGE === 'local') {
        return res.sendFile(path.resolve(basePath, `${req.params.id}.pdf`));
      }

      const s3TempPath = path.resolve(basePath, `${req.params.id}.pdf`);
      const s3Key = `${process.env.AWS_CRLVE_FOLDER}/${req.params.id}.pdf`;

      const s3 = new AWS.S3();
      const fileTemp = fs.createWriteStream(s3TempPath);
      const s3Stream = s3.getObject({ Bucket: process.env.AWS_BUCKET, Key: s3Key }).createReadStream();

      s3Stream.on('error', (err) => res.status(400).json({ message: err.message || 'Erro inesperado.' }));
      s3Stream.pipe(fileTemp).on('error', (err) => res.status(400).json({ message: err.message || 'Erro inesperado.' })).on('close', () => res.sendFile(s3TempPath));
    } else {
      return res.status(404).json({ message: 'CRLVe não encontrado.' });
    }
  }
}
