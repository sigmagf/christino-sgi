import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';

import { ClientsCreateService } from './service';

export class ClientsCreateController {
  constructor(private service: ClientsCreateService) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const name = req.body.name ? (req.body.name as string).toUpperCase() : undefined;
    const document = req.body.document ? (req.body.document as string).toUpperCase() : undefined;
    const group = req.body.group ? (req.body.group as string).toUpperCase() : undefined;

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
