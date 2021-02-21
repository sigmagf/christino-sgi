import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';
import { stringFix } from '~/utils/stringFix';

import { VehiclesUpdateService } from './service';

export class VehiclesUpdateController {
  constructor(private service: VehiclesUpdateService) { }

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const clientId = stringFix(req.body.clientId, undefined);
    const plate = stringFix(req.body.plate, undefined, 'UPPERCASE', 'STRING');
    const renavam = stringFix(req.body.renavam, undefined, 'UPPERCASE', 'NUMBER');
    const crv = stringFix(req.body.crv, null, 'UPPERCASE', 'NUMBER');
    const brandModel = stringFix(req.body.brandModel, undefined, 'UPPERCASE', 'STRING');
    const type = stringFix(req.body.type, undefined, 'UPPERCASE', 'STRING');
    const details = stringFix(req.body.details, null, 'NONE', 'STRING');
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
        return res.status(400).json({ code: 400, message: 'O item \'status\' é inválido.', details: 'O status deve ser entre \'1\',\'2\',\'3\',\'4\'' });
      }

      const vehicle = await this.service.execute({ id, clientId, plate, renavam, crv, brandModel, type, details, status, crlveIncluded });

      return res.json(vehicle);
    } catch(err) {
      return errorWork(res, err.message);
    }
  }
}
