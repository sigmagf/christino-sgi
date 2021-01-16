import { Request, Response } from 'express';

import { IClientsUpdateRequestDTO } from './dto';
import { ClientsUpdateService } from './service';

export class ClientsUpdateController {
  constructor(private service: ClientsUpdateService) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, document, group } = req.body as IClientsUpdateRequestDTO;

    try {
      const user = await this.service.execute({ id, name, document, group });

      return res.status(200).json(user);
    } catch(err) {
      return res.status(400).json({ message: err.message || 'Erro inesperado!' });
    }
  }
}
