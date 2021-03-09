import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';
import { stringFix } from '~/utils/stringFix';

import { WorksUpdateService } from './service';

export class WorksUpdateController {
  constructor(private service: WorksUpdateService) { }

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const clientId = stringFix(req.body.clientId, undefined);
    const serviceId = stringFix(req.body.serviceId, undefined);
    const identifier = stringFix(req.body.identifier, null, 'UPPERCASE', 'STRING');
    const value = stringFix(req.body.value, undefined, 'NONE', 'MONEY');
    const status = stringFix(req.body.status, undefined);
    const details = stringFix(req.body.details, undefined, 'NONE', 'STRING');
    const history = stringFix(req.body.history, undefined, 'NONE', 'STRING');

    try {
      if(!clientId) {
        throw new Error(JSON.stringify({ code: 400, message: 'O item \'clientId\' é nulo ou indefinido.', details: null }));
      }

      if(!serviceId) {
        throw new Error(JSON.stringify({ code: 400, message: 'O item \'serviceId\' é nulo ou indefinido.', details: null }));
      }

      if(!value) {
        throw new Error(JSON.stringify({ code: 400, message: 'O item \'value\' é nulo ou indefinido.', details: null }));
      }

      if(!status) {
        throw new Error(JSON.stringify({ code: 400, message: 'O item \'status\' é nulo ou indefinido.', details: null }));
      }

      if(!details) {
        throw new Error(JSON.stringify({ code: 400, message: 'O item \'details\' é nulo ou indefinido.', details: null }));
      }

      if(!history) {
        throw new Error(JSON.stringify({ code: 400, message: 'O item \'history\' é nulo ou indefinido.', details: null }));
      }

      if(parseInt(status, 10) < 1 || parseInt(status, 10) > 4) {
        throw new Error(JSON.stringify({ code: 400, message: 'O item \'status\' é inválido.', details: 'O status deve ser entre \'1\',\'2\',\'3\',\'4\'' }));
      }

      const work = await this.service.execute({ id, clientId, serviceId, identifier, value, status, details, history, updatedBy: req.user?.id });
      return res.json(work);
    } catch(err) {
      return errorWork(req, res, err);
    }
  }
}
