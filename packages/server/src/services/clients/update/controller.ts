import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';

import { ClientsUpdateService } from './service';

export class ClientsUpdateController {
  constructor(private service: ClientsUpdateService) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const name = req.body.name ? (req.body.name as string).toUpperCase() : undefined;
    const document = req.body.document ? (req.body.document as string).toUpperCase() : undefined;
    const group = req.body.group ? (req.body.group as string).toUpperCase() : undefined;

    try {
      const user = await this.service.execute({ id, name, document, group });

      return res.status(200).json(user);
    } catch(err) {
      return res.status(400).json(errorWork(err.message || null));
    }
  }
}
