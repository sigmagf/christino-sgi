import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';

import { ClientsListService } from './service';

export class ClientsListController {
  constructor(private service: ClientsListService) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    try {
      const clients = await this.service.execute({ page, limit });

      return res.status(200).json(clients);
    } catch(err) {
      return res.status(400).json(errorWork(err.message || null));
    }
  }
}
