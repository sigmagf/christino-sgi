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
    const clientId = stringFix(req.query.clientId, undefined);
    const group = stringFix(req.query.group, undefined, 'UPPERCASE', 'STRING');
    const plate = stringFix(req.query.plate, undefined, 'UPPERCASE', 'STRING');
    const renavam = stringFix(req.query.renavam, undefined, 'UPPERCASE', 'NUMBER');
    const crv = stringFix(req.query.crv, undefined, 'UPPERCASE', 'NUMBER');
    const brandModel = stringFix(req.query.brandModel, undefined, 'UPPERCASE', 'STRING');
    const status = stringFix(req.query.status, undefined);
    const plateEnd = stringFix(req.query.plateEnd, undefined, 'UPPERCASE', 'STRING');
    const includeTruck = stringFix(req.query.includeTruck, undefined);

    try {
      if(status && (parseInt(status, 10) < 1 || parseInt(status, 10) > 4)) {
        throw new Error(JSON.stringify({ code: 400, message: 'O item \'status\' é inválido.', details: 'O status deve ser entre \'1\',\'2\',\'3\',\'4\'' }));
      }

      const vehicles = await this.service.execute({ page, limit, filters: { pagination, plateEnd, clientId, status, group, plate, renavam, crv, brandModel, includeTruck } });
      return res.json(vehicles);
    } catch(err) {
      return errorWork(res, err.message);
    }
  }
}
