import AWS from 'aws-sdk';
import { Request, Response } from 'express';
import path from 'path';

import { errorWork } from '~/utils/errorWork';

import { vehiclesFindService } from '../find';

export class VehiclesViewWithdrawalController {
  constructor() { }

  async handle(req: Request, res: Response) {
    try {
      const vehicle = await vehiclesFindService.execute({ id: req.params.id });

      if(!vehicle.withdrawalIncluded) {
        throw new Error(JSON.stringify({ code: 404, message: 'Withdrawal não encontrado.', details: null }));
      }

      if(process.env.MULTER_STORAGE === 'local') {
        return res.sendFile(path.resolve(__dirname, '..', '..', '..', '..', 'tmp', 'withdrawal', `${req.params.id}.pdf`));
      }

      const s3 = new AWS.S3();
      const s3Stream = await s3.getObject({ Bucket: process.env.AWS_S3_BUCKET, Key: `${process.env.AWS_S3_FOLDER_WITHDRAWALS}/${req.params.id}.pdf` }).promise();
      return res.contentType(s3Stream.ContentType).send(s3Stream.Body);
    } catch(err) {
      return errorWork(req, res, err);
    }
  }
}
