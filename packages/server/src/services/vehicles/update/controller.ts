import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';
import { stringFix } from '~/utils/stringFix';

import { VehiclesUpdateService } from './service';

export class VehiclesUpdateController {
  constructor(private service: VehiclesUpdateService) { }

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const name = stringFix(req.body.name, undefined, 'UPPERCASE');
    const document = stringFix(req.body.document, undefined, 'UPPERCASE');
    const group = stringFix(req.body.group, undefined, 'UPPERCASE');

    const plate = stringFix(req.body.plate, undefined, 'UPPERCASE');
    const renavam = stringFix(req.body.renavam, undefined, 'UPPERCASE');
    const crv = stringFix(req.body.crv, undefined, 'UPPERCASE');
    const brand_model = stringFix(req.body.brand_model, undefined, 'UPPERCASE');
    const type = stringFix(req.body.type, undefined, 'UPPERCASE');
    const details = stringFix(req.body.details, undefined, 'UPPERCASE');
    const status = stringFix(req.body.status, undefined, 'LOWERCASE');

    try {
      if(req.user && req.user.desp_permission < 2) {
        throw new Error(JSON.stringify({ code: 401, message: 'User not have permission for this route.' }));
      }

      const user = await this.service.execute({ id, name, document, group, plate, renavam, crv, brand_model, type, details, status });
      return res.status(200).json(user);
    } catch(err) {
      return errorWork(res, err.message || null);
    }
  }
}
