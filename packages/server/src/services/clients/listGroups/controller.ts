import { Request, Response } from 'express';

import { ClientsListGroupsService } from './service';

export class ClientsListGroupsController {
  constructor(private service: ClientsListGroupsService) { }

  async handle(req: Request, res: Response) {
    try {
      const groups = await this.service.execute();
      return res.status(200).json(groups);
    } catch(err) {
      return res.status(500).json({ code: 500, message: 'Erro inesperado.', details: err.message || null });
    }
  }
}
