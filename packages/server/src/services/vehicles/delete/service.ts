import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';

import { IVehicle } from '~/entities/IVehicle';
import { IVehiclesRepository } from '~/repositories/IVehiclesRepository';

export class VehiclesDeleteService {
  constructor(private repository: IVehiclesRepository) { }

  async execute(data: Pick<IVehicle, 'id'>) {
    if(!await this.repository.findById(data.id)) {
      throw new Error(JSON.stringify({ code: 404, message: 'Veículo não encontrado.', details: null }));
    }

    await this.repository.delete(data.id);

    if(process.env.MULTER_STORAGE === 'local') {
      fs.unlinkSync(path.resolve(__dirname, '..', '..', '..', '..', 'tmp', 'crlve', `${data.id}.pdf`));
    } else {
      const s3 = new AWS.S3();
      await s3.deleteObject({ Bucket: process.env.AWS_S3_BUCKET, Key: `${process.env.AWS_S3_FOLDER_CRLVE}/${data.id}.pdf` }).promise();
    }
  }
}
