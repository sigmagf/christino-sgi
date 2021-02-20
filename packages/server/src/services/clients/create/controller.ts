import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';
import { stringFix } from '~/utils/stringFix';

import { ClientsCreateService } from './service';

export class ClientsCreateController {
  constructor(private service: ClientsCreateService) { }

  async handle(req: Request, res: Response) {
    const name = stringFix(req.body.name, undefined, 'UPPERCASE', 'STRING');
    const document = stringFix(req.body.document, undefined, 'UPPERCASE', 'NUMBER');
    const group = stringFix(req.body.group, null, 'UPPERCASE', 'STRING');
    const email = stringFix(req.body.email, null, 'LOWERCASE', 'STRING');
    const phone1 = stringFix(req.body.phone1, null, 'UPPERCASE', 'NUMBER');
    const phone2 = stringFix(req.body.phone2, null, 'UPPERCASE', 'NUMBER');

    try {
      if(!name) {
        throw new Error(JSON.stringify({ code: 400, message: 'O item \'name\' é nulo ou indefinido.', details: null }));
      }

      if(!document) {
        throw new Error(JSON.stringify({ code: 400, message: 'O item \'document\' é nulo ou indefinido.', details: null }));
      }

      const client = await this.service.execute({ name, document, group, email, phone1, phone2 });
      return res.status(201).json(client);
    } catch(err) {
      return errorWork(res, err.message);
    }
  }
}
