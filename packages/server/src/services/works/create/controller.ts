import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';
import { stringFix } from '~/utils/stringFix';

import { WorksCreateService } from './service';

export class WorksCreateController {
  constructor(private service: WorksCreateService) { }

  async handle(req: Request, res: Response) {
    // Client
    const name = stringFix(req.body.name, undefined, 'UPPERCASE');
    const document = stringFix(req.body.document, undefined, 'UPPERCASE');
    const group = stringFix(req.body.group, undefined, 'UPPERCASE');

    // Work
    const identifier = stringFix(req.body.identifier, undefined, 'UPPERCASE');
    const service_id = stringFix(req.body.service_id, undefined);
    const value = stringFix(req.body.value, undefined);
    const details = stringFix(req.body.details, undefined);
    const status = stringFix(req.body.status, undefined) || 0;
    const history = stringFix(req.body.history, undefined);

    try {
      if(!name) {
        throw new Error(JSON.stringify({ code: 400, message: 'Client name is null or undefined.' }));
      }

      if(!document) {
        throw new Error(JSON.stringify({ code: 400, message: 'Client document is null or undefined.' }));
      }

      if(!service_id) {
        throw new Error(JSON.stringify({ code: 400, message: 'Work service_id is null or undefined.' }));
      }

      if(!value) {
        throw new Error(JSON.stringify({ code: 400, message: 'Work value is null or undefined.' }));
      }

      if(status === undefined || status === null) {
        throw new Error(JSON.stringify({ code: 400, message: 'Work status is null or undefined.' }));
      }

      const vehicle = await this.service.execute({ name, document, group, service_id, identifier, value, details, status, history });
      return res.status(201).json(vehicle);
    } catch(err) {
      return errorWork(res, err.message || null);
    }
  }
}
