import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';

import { ClientsFindService } from './service';

export class ClientsFindController {
  constructor(private service: ClientsFindService) { }

  async handle(req: Request, res: Response) {
    const { param } = req.params;

    try {
      const client = await this.service.execute({ param });

      if(!client) {
        throw new Error(JSON.stringify({ code: 400, message: 'Cliente não encontrado.', details: null }));
      }

      return res.status(200).json(client);
    } catch(err) {
      return errorWork(res, err.message);
    }
  }
}
