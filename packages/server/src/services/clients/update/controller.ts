import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';
import { stringFix } from '~/utils/stringFix';

import { ClientsUpdateService } from './service';

export class ClientsUpdateController {
  constructor(private service: ClientsUpdateService) { }

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const name = stringFix(req.body.name, undefined, 'UPPERCASE');
    const document = stringFix(req.body.document, undefined, 'UPPERCASE').replace(/\D/g, '');
    const group = stringFix(req.body.group, undefined, 'UPPERCASE');
    const email = stringFix(req.body.email, undefined, 'UPPERCASE');
    const phone1 = stringFix(req.body.phone1, undefined, 'UPPERCASE');
    const phone2 = stringFix(req.body.phone2, undefined, 'UPPERCASE');

    try {
      if(!name) {
        throw new Error(JSON.stringify({ code: 400, message: 'O item \'name\' é nulo ou indefinido.', details: null }));
      }

      if(!document) {
        throw new Error(JSON.stringify({ code: 400, message: 'O item \'document\' é nulo ou indefinido.', details: null }));
      }

      const client = await this.service.execute({ id, name, document, group, email, phone1, phone2 });
      return res.status(200).json(client);
    } catch(err) {
      return errorWork(res, err.message);
    }
  }
}
