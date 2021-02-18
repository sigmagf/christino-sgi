import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';
import { stringFix } from '~/utils/stringFix';

import { VehiclesCreateService } from './service';

export class VehiclesCreateController {
  constructor(private service: VehiclesCreateService) { }

  async handle(req: Request, res: Response) {
    const clientId = stringFix(req.body.clientId, undefined);
    const plate = stringFix(req.body.plate, undefined, 'UPPERCASE');
    const renavam = stringFix(req.body.renavam, undefined);
    const crv = stringFix(req.body.crv, null);
    const brandModel = stringFix(req.body.brandModel, undefined, 'UPPERCASE');
    const type = stringFix(req.body.type, undefined, 'UPPERCASE');
    const details = stringFix(req.body.details, null, 'UPPERCASE');
    const status = stringFix(req.body.status, undefined);
    const crlveIncluded = stringFix(req.body.crlveIncluded, undefined);

    try {
      if(!clientId) {
        throw new Error(JSON.stringify({ code: 400, message: 'O item \'clientId\' é nulo ou indefinido.', details: null }));
      }

      if(!plate) {
        throw new Error(JSON.stringify({ code: 400, message: 'O item \'plate\' é nulo ou indefinido.', details: null }));
      }

      if(!renavam) {
        throw new Error(JSON.stringify({ code: 400, message: 'O item \'renavam\' é nulo ou indefinido.', details: null }));
      }

      if(!brandModel) {
        throw new Error(JSON.stringify({ code: 400, message: 'O item \'brandModel\' é nulo ou indefinido.', details: null }));
      }

      if(!type) {
        throw new Error(JSON.stringify({ code: 400, message: 'O item \'type\' é nulo ou indefinido.', details: null }));
      }

      if(!status) {
        throw new Error(JSON.stringify({ code: 400, message: 'O item \'status\' é nulo ou indefinido.', details: null }));
      }

      if(parseInt(status, 10) < 1 || parseInt(status, 10) > 4) {
        throw new Error(JSON.stringify({ code: 400, message: 'O item \'status\' é inválido.', details: 'O status deve ser entre \'1\',\'2\',\'3\',\'4\'' }));
      }

      const vehicle = await this.service.execute({
        clientId,
        plate,
        renavam: renavam.replace(/\D/g, ''),
        crv: crv?.replace(/\D/g, '') || null,
        brandModel,
        type,
        details,
        status,
        crlveIncluded,
      });

      return res.status(201).json(vehicle);
    } catch(err) {
      return errorWork(res, err.message);
    }
  }
}
