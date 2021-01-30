import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';

import { IVehiclesImportRequestDTO } from './dto';
import { VehiclesImportService } from './service';

export class VehiclesImportController {
  constructor(private service: VehiclesImportService) { }

  async handle(req: Request, res: Response) {
    const { data } = req.body as IVehiclesImportRequestDTO;

    try {
      if(req.user && req.user.desp_permission < 2) {
        throw new Error(JSON.stringify({ code: 401, message: 'User not have permission for this route.' }));
      }

      if(!Array.isArray(data)) {
        throw new Error(JSON.stringify({ code: 400, message: 'Data is not array' }));
      }

      await this.service.execute({ data });
      return res.status(201).send();
    } catch(err) {
      return errorWork(res, err.message || null);
    }
  }
}
