import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';

import { ClientsDeleteService } from './service';

export class ClientsDeleteController {
  constructor(private service: ClientsDeleteService) { }

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await this.service.execute({ id });
      return res.status(200).send();
    } catch(err) {
      return errorWork(req, res, err);
    }
  }
}
