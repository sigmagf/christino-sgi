import { Request, Response } from 'express';

import { UsersListService } from './service';

export class UsersListController {
  constructor(private service: UsersListService) { }

  async handle(req: Request, res: Response) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    try {
      const user = await this.service.execute({ page, limit });
      return res.status(200).json(user);
    } catch(err) {
      return res.status(500).json({ code: 500, message: 'Erro inesperado.', details: err.message || null });
    }
  }
}
