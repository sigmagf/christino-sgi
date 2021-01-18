import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';

import { IClientsCreateRequestDTO } from './dto';
import { ClientsCreateService } from './service';

export class ClientsCreateController {
  constructor(private service: ClientsCreateService) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, document, group } = req.body as IClientsCreateRequestDTO;

    try {
      if(!name || !document || !group) {
        throw new Error('Obrigatory items not informed');
      }

      const client = await this.service.execute({ name, document, group });

      return res.status(201).json(client);
    } catch(err) {
      return res.status(400).json(errorWork(err.message || null));
    }
  }
}
