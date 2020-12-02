import { Request, Response } from 'express';

import { IClientsUpdateRequestDTO } from './dto';
import { ClientsUpdateService } from './service';

export class ClientsUpdateController {
  constructor(private service: ClientsUpdateService) { }

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { name, document, group } = req.body as IClientsUpdateRequestDTO['client'];

    try {
      const response = await this.service.execute({
        id,
        client: { name, document, group },
      });

      return res.json(response);
    } catch(err) {
      return res.status(400).json({ message: err.message || 'Unexpected error.' });
    }
  }
}
