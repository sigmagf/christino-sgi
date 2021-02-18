import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';

import { VehiclesFindService } from './service';

export class VehiclesFindController {
  constructor(private service: VehiclesFindService) { }

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const vehicle = await this.service.execute({ id });

      if(!vehicle) {
        throw new Error(JSON.stringify({ code: 404, message: 'Veículo não encontrado.', details: null }));
      }

      return res.json(vehicle);
    } catch(err) {
      return errorWork(res, err.message);
    }
  }
}
