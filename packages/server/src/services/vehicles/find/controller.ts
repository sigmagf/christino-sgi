import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';

import { VehiclesFindService } from './service';

export class VehiclesFindController {
  constructor(private service: VehiclesFindService) { }

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      if(req.user && req.user.desp_permission < 1) {
        throw new Error(JSON.stringify({ code: 401, message: 'User not have permission for this route.' }));
      }

      const vehicle = await this.service.execute({ id });
      return res.status(200).json(vehicle);
    } catch(err) {
      return errorWork(res, err.message || null);
    }
  }
}
