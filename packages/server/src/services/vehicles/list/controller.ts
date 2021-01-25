import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';

import { VehiclesListService } from './service';

export class VehiclesListController {
  constructor(private service: VehiclesListService) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const pagination = (req.query.noPagination as string || 'false').toLowerCase() !== 'true';

    const client_id = req.query.client_id as string || undefined;
    const plate = req.query.plate as string || undefined;
    const renavam = req.query.renavam as string || undefined;
    const crv = req.query.crv as string || undefined;
    const brand_model = req.query.brand_model as string || undefined;
    const status = req.query.status as string || undefined;

    const group = req.query.group as string || undefined;
    const plate_end = req.query.plate_end as string || undefined;

    try {
      const vehicles = await this.service.execute({ page, limit, filters: { pagination, plate_end, client_id, status, group, plate, renavam, crv, brand_model } });

      return res.status(200).json(vehicles);
    } catch(err) {
      return res.status(400).json(errorWork(err.message || null));
    }
  }
}
