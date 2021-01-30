import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';

import { IVehiclesImportRequestDTO } from './dto';
import { VehiclesImportService } from './service';

export class VehiclesImportController {
  constructor(private service: VehiclesImportService) { }

  async handle(req: Request, res: Response) {
    const { data } = req.body as IVehiclesImportRequestDTO;

    try {
      if(!Array.isArray(data)) {
        throw new Error('Data is not array');
      }

      await this.service.execute({ data });
      return res.status(201).send();
    } catch(err) {
      return errorWork(res, err.message || null);
    }
  }
}
