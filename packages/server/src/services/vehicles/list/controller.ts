import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';
import { stringFix } from '~/utils/stringFix';

import { VehiclesListService } from './service';

export class VehiclesListController {
  constructor(private service: VehiclesListService) { }

  async handle(req: Request, res: Response) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    const pagination = (req.query.noPagination as string || 'false').toLowerCase() !== 'true';
    const clientId = req.body.clientId || undefined;
    const group = stringFix(req.query.group, undefined, 'UPPERCASE');
    const plate = stringFix(req.body.plate, undefined, 'UPPERCASE');
    const renavam = req.body.renavam || undefined;
    const crv = req.body.crv || undefined;
    const brandModel = stringFix(req.body.brandModel, undefined, 'UPPERCASE');
    const status = req.body.status || undefined;
    const plateEnd = stringFix(req.query.plateEnd, undefined, 'UPPERCASE');
    const includeTruck = stringFix(req.query.includeTruck, undefined, 'UPPERCASE');

    try {
      const vehicles = await this.service.execute({
        page,
        limit,
        filters: {
          pagination,
          plateEnd,
          clientId,
          status,
          group,
          plate,
          renavam: renavam?.replace(/\D/g, '') || null,
          crv: crv?.replace(/\D/g, '') || null,
          brandModel,
          includeTruck,
        },
      });
      return res.json(vehicles);
    } catch(err) {
      return errorWork(res, err.message);
    }
  }
}
