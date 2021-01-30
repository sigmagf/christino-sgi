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
    const include_truck = (req.query.include_truck as string || 'false').toLowerCase() === 'true';
    const client_id = stringFix(req.query.client_id, undefined);
    const group = stringFix(req.query.group, undefined, 'UPPERCASE');
    const plate = stringFix(req.query.plate, undefined, 'UPPERCASE');
    const renavam = stringFix(req.query.renavam, undefined, 'UPPERCASE');
    const crv = stringFix(req.query.crv, undefined, 'UPPERCASE');
    const brand_model = stringFix(req.query.brand_model, undefined, 'UPPERCASE');
    const status = stringFix(req.query.status, undefined, 'UPPERCASE');
    const plate_end = stringFix(req.query.plate_end, undefined, 'UPPERCASE');

    try {
      if(req.user && req.user.desp_permission < 1) {
        throw new Error(JSON.stringify({ code: 401, message: 'User not have permission for this route.' }));
      }

      const vehicles = await this.service.execute({
        page, limit, filters: { pagination, plate_end, client_id, status, group, plate, renavam, crv, brand_model, include_truck },
      });
      return res.status(200).json(vehicles);
    } catch(err) {
      return errorWork(res, err.message || null);
    }
  }
}
