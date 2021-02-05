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
    const status = stringFix(req.body.status, undefined, 'UPPERCASE');

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

      if(!status) {
        throw new Error(JSON.stringify({ code: 400, message: 'Vehicle status is null or undefined.' }));
      }

      const user = await this.service.execute({ id, name, document, group, plate, renavam, crv, brand_model, type, details, status });
      return res.status(200).json(user);
    } catch(err) {
      return errorWork(res, err.message || null);
    }
  }
}
