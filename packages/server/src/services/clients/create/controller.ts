import { Request, Response } from 'express';

import { IClientsCreateRequestDTO } from './dto';
import { ClientCreateService } from './service';

export class ClientsCreateController {
  constructor(private service: ClientCreateService) { }

  async handle(req: Request, res: Response) {
    const { name, document, group } = await req.body as IClientsCreateRequestDTO;

    if(!name || !document) {
      return res.status(400).json({ message: 'Invalid sended data.' });
    }

    try {
      const response = await this.service.execute({ name, document, group });

      return res.json(response);
    } catch(err) {
      return res.status(400).json({ message: err.message || 'Unexpected error.' });
    }
  }
}
