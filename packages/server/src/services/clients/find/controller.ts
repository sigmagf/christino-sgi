import { Request, Response } from 'express';

import { ClientsFindService } from './service';

export class ClientsFindController {
  constructor(private service: ClientsFindService) { }

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const client = await this.service.execute({ id });
      return res.status(200).json(client);
    } catch(err) {
      return res.status(500).json({ code: 500, message: 'Erro inesperado.', details: err.message || null });
    }
  }
}
