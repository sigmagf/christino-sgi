import { Request, Response } from 'express';

import { ClientsListService } from './service';

export class ClientsListController {
  constructor(private service: ClientsListService) { }

  async handle(req: Request, res: Response) {
    const page = parseInt(req.query.page as string || '1', 10);
    const limit = parseInt(req.query.limit as string || '10', 10);
    const name = req.query.name as string || undefined;
    const document = req.query.document as string || undefined;
    const group = req.query.group as string || undefined;

    try {
      const response = await this.service.execute({ page, limit, filters: { name, document, group } });

      return res.json(response);
    } catch(err) {
      return res.status(400).json({ message: err.message || 'Unexpected error.' });
    }
  }
}
