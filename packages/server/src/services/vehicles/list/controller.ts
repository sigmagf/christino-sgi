import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';

import { VehiclesListService } from './service';

export class VehiclesListController {
  constructor(private service: VehiclesListService) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    try {
      const vehicles = await this.service.execute({ page, limit });

      return res.status(200).json(vehicles);
    } catch(err) {
      return res.status(400).json(errorWork(err.message || null));
    }
  }
}
