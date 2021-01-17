import { Request, Response } from 'express';

import { errorWork } from '~/utils/errrorWork';

import { ClientsFindService } from './service';

export class ClientsFindController {
  constructor(private service: ClientsFindService) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const client = await this.service.execute({ id });

      return res.status(200).json(client);
    } catch(err) {
      return res.status(400).json(errorWork(err.message || null));
    }
  }
}
