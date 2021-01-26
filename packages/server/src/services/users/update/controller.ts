import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';

import { UsersUpdateService } from './service';

export class UsersUpdateController {
  constructor(private service: UsersUpdateService) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const name = req.body.name ? (req.body.name as string).toUpperCase() : undefined;
    const email = req.body.email ? (req.body.email as string).toLowerCase() : undefined;
    const password = req.body.password ? (req.body.password as string).trim() : undefined;

    try {
      const user = await this.service.execute({ id, name, email, password });

      return res.status(200).json(user);
    } catch(err) {
      return res.status(400).json(errorWork(err.message || null));
    }
  }
}
