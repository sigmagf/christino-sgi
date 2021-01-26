import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';
import { stringFix } from '~/utils/stringFix';

import { VehiclesCreateService } from './service';

export class VehiclesCreateController {
  constructor(private service: VehiclesCreateService) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const name = stringFix(req.body.name, undefined, 'UPPERCASE');
    const document = stringFix(req.body.document, undefined, 'UPPERCASE');
    const group = stringFix(req.body.group, undefined, 'UPPERCASE');

    const plate = stringFix(req.body.plate, undefined, 'UPPERCASE');
    const renavam = stringFix(req.body.renavam, undefined, 'UPPERCASE');
    const crv = stringFix(req.body.crv, undefined, 'UPPERCASE');
    const brand_model = stringFix(req.body.brand_model, undefined, 'UPPERCASE');
    const type = stringFix(req.body.type, undefined, 'UPPERCASE');
    const details = stringFix(req.body.details, undefined, 'UPPERCASE');
    const status = stringFix(req.body.status, undefined, 'UPPERCASE');

    try {
      if(!name && !document) {
        throw new Error('Client not informed');
      }

      if(!plate || !renavam || !brand_model || !type) {
        throw new Error('Obrigatory items not informed');
      }

      const vehicle = await this.service.execute({ name, document, group, plate, renavam, crv, brand_model, type, details, status });

      return res.status(201).json(vehicle);
    } catch(err) {
      return res.status(400).json(errorWork(err.message || null));
    }
  }
}
