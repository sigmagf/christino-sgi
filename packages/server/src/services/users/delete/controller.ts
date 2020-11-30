import { Request, Response } from 'express';

import { UsersDeleteService } from './service';

export class UsersDeleteController {
  constructor(private service: UsersDeleteService) { }

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await this.service.execute({ id });

      return res.status(200).end();
    } catch(err) {
      return res.status(400).json({ message: err.message || 'Unexpected error.' });
    }
  }
}
