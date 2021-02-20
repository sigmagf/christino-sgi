import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';
import { stringFix } from '~/utils/stringFix';

import { ClientsUpdateService } from './service';

export class ClientsUpdateController {
  constructor(private service: ClientsUpdateService) { }

  async handle(req: Request, res: Response) {
    const { id } = req.params;

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

      const client = await this.service.execute({
        id,
        name: name.normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
        document: document.replace(/\D/g, ''),
        group: group ? group.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : null,
        email: email ? email.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : null,
        phone1: phone1 ? phone1.replace(/\D/g, '') : null,
        phone2: phone2 ? phone2.replace(/\D/g, '') : null,
      });
      return res.status(200).json(client);
    } catch(err) {
      return errorWork(res, err.message);
    }
  }
}
