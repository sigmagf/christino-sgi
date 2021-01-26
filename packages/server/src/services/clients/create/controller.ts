import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';
import { stringFix } from '~/utils/stringFix';

import { ClientsCreateService } from './service';

export class ClientsCreateController {
  constructor(private service: ClientsCreateService) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const name = stringFix(req.body.name, undefined, 'UPPERCASE');
    const document = stringFix(req.body.document, undefined, 'UPPERCASE');
    const group = stringFix(req.body.group, undefined, 'UPPERCASE');

    try {
      if(!name || !document) {
        throw new Error('Obrigatory items not informed');
      }

      const client = await this.service.execute({ name, document, group });

      return res.status(201).json(client);
    } catch(err) {
      return res.status(400).json(errorWork(err.message || null));
    }
  }
}
