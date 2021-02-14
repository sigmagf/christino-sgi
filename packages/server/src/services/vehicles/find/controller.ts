import { Request, Response } from 'express';

import { VehiclesFindService } from './service';

export class VehiclesFindController {
  constructor(private service: VehiclesFindService) { }

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const vehicle = await this.service.execute({ id });
      return res.status(200).json(vehicle);
    } catch(err) {
      return res.status(500).json({ code: 500, message: 'Erro inesperado.', details: err.message || null });
    }
  }
}
