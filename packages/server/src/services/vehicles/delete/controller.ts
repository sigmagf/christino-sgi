import { Request, Response } from 'express';

import { VehiclesDeleteService } from './service';

export class VehiclesDeleteController {
  constructor(private service: VehiclesDeleteService) { }

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await this.service.execute({ id });
      return res.status(200).send();
    } catch(err) {
      return res.status(500).json({ code: 500, message: 'Erro inesperado.', details: err.message || null });
    }
  }
}
