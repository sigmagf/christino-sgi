import csvToJson from 'csvtojson';
import { Request, Response } from 'express';
import fs from 'fs';

import { errorWork } from '~/utils/errrorWork';

import { IVehiclesImportRequestDTO } from './dto';
import { VehiclesImportService } from './service';

export class VehiclesImportController {
  constructor(private service: VehiclesImportService) { }

  async handle(req: Request, res: Response): Promise<Response> {
    if(!req.file) {
      return res.status(400).json({ message: 'Nenhum arquivo enviado!' });
    }

    try {
      const data: IVehiclesImportRequestDTO['data'] = await csvToJson().fromFile(req.file.path);
      fs.unlinkSync(req.file.path);

      await this.service.execute({ data });
      return res.status(201).send();
    } catch(err) {
      return res.status(400).json(errorWork(err.message || null));
    }
  }
}
