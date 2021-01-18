import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';

import { VehiclesDeleteService } from './service';

export class VehiclesDeleteController {
  constructor(private service: VehiclesDeleteService) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      await this.service.execute({ id });

      return res.status(200).send();
    } catch(err) {
      return res.status(400).json(errorWork(err.message || null));
    }
  }
}
