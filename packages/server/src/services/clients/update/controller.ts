import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';

import { ClientsUpdateService } from './service';

export class ClientsUpdateController {
  constructor(private service: ClientsUpdateService) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, document, folder } = req.body;

    try {
      const user = await this.service.execute({ id, name, document, folder });

      return res.status(200).json(user);
    } catch(err) {
      return res.status(400).json(errorWork(err.message || null));
    }
  }
}
