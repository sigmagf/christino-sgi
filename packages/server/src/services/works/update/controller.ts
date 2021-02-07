import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';
import { stringFix } from '~/utils/stringFix';

import { WorksUpdateService } from './service';

export class WorksUpdateController {
  constructor(private service: WorksUpdateService) { }

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const name = stringFix(req.body.name, undefined, 'UPPERCASE');
    const document = stringFix(req.body.document, undefined, 'LOWERCASE');
    const group = stringFix(req.body.group, undefined, 'UPPERCASE');

    const service_id = stringFix(req.body.service_id, undefined);
    const identifier = stringFix(req.body.identifier, undefined, 'UPPERCASE');
    const value = stringFix(req.body.value, undefined);
    const details = stringFix(req.body.details, undefined);
    const status = stringFix(req.body.status, undefined);
    const history = stringFix(req.body.history, undefined, 'UPPERCASE');

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

      if(!identifier) {
        throw new Error(JSON.stringify({ code: 400, message: 'Work identifier is null or undefined.' }));
      }

      if(!value) {
        throw new Error(JSON.stringify({ code: 400, message: 'Work value is null or undefined.' }));
      }

      if(!details) {
        throw new Error(JSON.stringify({ code: 400, message: 'Work details is null or undefined.' }));
      }

      if(!status) {
        throw new Error(JSON.stringify({ code: 400, message: 'Work status is null or undefined.' }));
      }

      if(!history) {
        throw new Error(JSON.stringify({ code: 400, message: 'Work history is null or undefined.' }));
      }

      const user = await this.service.execute({ id, name, document, group, service_id, identifier, value, details, status, history });
      return res.status(200).json(user);
    } catch(err) {
      console.log(err);
      return errorWork(res, err.message || null);
    }
  }
}
