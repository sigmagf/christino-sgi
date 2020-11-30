import { Request, Response } from 'express';

import { VehiclesListService } from './service';

export class VehiclesListController {
  constructor(private service: VehiclesListService) { }

  async handle(req: Request, res: Response) {
    const page = parseInt(req.query.page as string || '1', 10);
    const limit = parseInt(req.query.limit as string || '10', 10);

    const plate = req.query.plate as string || undefined;
    const renavam = req.query.renavam as string || undefined;
    const brandModel = req.query.brandModel as string || undefined;
    const type = req.query.type as string || undefined;

    try {
      const response = await this.service.execute({ page, limit, filters: { plate, renavam, brandModel, type } });

      return res.json(response);
    } catch(err) {
      return res.status(400).json({ message: err.message || 'Unexpected error.' });
    }
  }
}
