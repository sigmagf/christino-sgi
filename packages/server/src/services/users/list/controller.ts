import { Request, Response } from 'express';

import { UsersListService } from './service';

export class UsersListController {
  constructor(private service: UsersListService) { }

  async handle(req: Request, res: Response) {
    const page = parseInt(req.query.page as string || '1', 10);
    const limit = parseInt(req.query.limit as string || '10', 10);
    const noPagination = req.query.noPagination as string || undefined;

    const name = req.query.name as string || undefined;
    const email = req.query.email as string || undefined;

    try {
      const response = await this.service.execute({
        page,
        limit,
        noPagination,
        filters: {
          name,
          email,
        },
      });

      return res.json(response);
    } catch(err) {
      return res.status(400).json({ message: err.message || 'Unexpected error.' });
    }
  }
}
