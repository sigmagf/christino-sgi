import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';

import { ClientsFindService } from './service';

export class ClientsFindController {
  constructor(private service: ClientsFindService) { }

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const client = await this.service.execute({ id });
      return res.status(200).json(client);
    } catch(err) {
      return errorWork(res, err.message);
    }
  }
}
