import { Request, Response } from 'express';

import { ClientsDeleteService } from './service';

export class ClientsDeleteController {
  constructor(private service: ClientsDeleteService) { }

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await this.service.execute({ id });
      return res.status(200).send();
    } catch(err) {
      return res.status(500).json({ code: 500, message: 'Erro inesperado.', details: err.message || null });
    }
  }
}
