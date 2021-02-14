import { Request, Response } from 'express';

import { UsersFindService } from './service';

export class UsersFindController {
  constructor(private service: UsersFindService) { }

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await this.service.execute({ id });
      return res.status(200).json(user);
    } catch(err) {
      return res.status(500).json({ code: 500, message: 'Erro inesperado.', details: err.message || null });
    }
  }
}
