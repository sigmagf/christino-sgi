import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';
import { stringFix } from '~/utils/stringFix';

import { ClientsCreateService } from './service';

export class ClientsCreateController {
  constructor(private service: ClientsCreateService) { }

  async handle(req: Request, res: Response) {
    const name = stringFix(req.body.name, undefined, 'UPPERCASE');
    const document = stringFix(req.body.document, undefined, 'UPPERCASE');
    const group = stringFix(req.body.group, undefined, 'UPPERCASE');
    const email = stringFix(req.body.email, undefined, 'UPPERCASE');
    const phone1 = stringFix(req.body.phone1, undefined, 'UPPERCASE');
    const phone2 = stringFix(req.body.phone2, undefined, 'UPPERCASE');

    try {
      if(!name) {
        throw new Error(JSON.stringify({ code: 400, message: 'Name is null or undefined.' }));
      }

      if(!document) {
        throw new Error(JSON.stringify({ code: 400, message: 'Document is null or undefined.' }));
      }

      const client = await this.service.execute({ name, document: document.replace(/\D/g, ''), group, email, phone1, phone2 });
      return res.status(201).json(client);
    } catch(err) {
      return errorWork(res, err.message || null);
    }
  }
}
