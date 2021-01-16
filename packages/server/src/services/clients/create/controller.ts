import { Request, Response } from 'express';

import { IClientsCreateRequestDTO } from './dto';
import { ClientsCreateService } from './service';

export class ClientsCreateController {
  constructor(private service: ClientsCreateService) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, document, group } = req.body as IClientsCreateRequestDTO;

    try {
      const client = await this.service.execute({ name, document, group });

      return res.status(201).json(client);
    } catch(err) {
      return res.status(400).json({ message: err.message || 'Erro inesperado!' });
    }
  }
}
