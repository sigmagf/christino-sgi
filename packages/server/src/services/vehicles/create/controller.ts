import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';
import { stringFix } from '~/utils/stringFix';

import { VehiclesCreateService } from './service';

export class VehiclesCreateController {
  constructor(private service: VehiclesCreateService) { }

  async handle(req: Request, res: Response) {
    const name = stringFix(req.body.name, undefined, 'UPPERCASE');
    const document = stringFix(req.body.document, undefined, 'UPPERCASE');
    const group = stringFix(req.body.group, undefined, 'UPPERCASE');

    const plate = stringFix(req.body.plate, undefined, 'UPPERCASE');
    const renavam = stringFix(req.body.renavam, undefined, 'UPPERCASE');
    const crv = stringFix(req.body.crv, undefined, 'UPPERCASE');
    const brand_model = stringFix(req.body.brand_model, undefined, 'UPPERCASE');
    const type = stringFix(req.body.type, undefined, 'UPPERCASE');
    const details = stringFix(req.body.details, undefined, 'UPPERCASE');
    const status = req.body.status || undefined;

    try {
      if(!name) {
        throw new Error(JSON.stringify({ code: 400, message: 'Client name is null or undefined.' }));
      }

      if(!document) {
        throw new Error(JSON.stringify({ code: 400, message: 'Client document is null or undefined.' }));
      }

      if(!plate) {
        throw new Error(JSON.stringify({ code: 400, message: 'Vehicle plate is null or undefined.' }));
      }

      if(!renavam) {
        throw new Error(JSON.stringify({ code: 400, message: 'Vehicle renavam is null or undefined.' }));
      }

      if(!crv) {
        throw new Error(JSON.stringify({ code: 400, message: 'Vehicle crv is null or undefined.' }));
      }

      if(!brand_model) {
        throw new Error(JSON.stringify({ code: 400, message: 'Vehicle brand_model is null or undefined.' }));
      }

      if(!type) {
        throw new Error(JSON.stringify({ code: 400, message: 'Vehicle type is null or undefined.' }));
      }

      const vehicle = await this.service.execute({ name, document, group, plate, renavam, crv, brand_model, type, details, status });
      return res.status(201).json(vehicle);
    } catch(err) {
      return errorWork(res, err.message || null);
    }
  }
}
