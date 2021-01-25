import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';

import { UsersCreateService } from './service';

export class UsersCreateController {
  constructor(private service: UsersCreateService) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const name = req.body.name ? (req.body.name as string).toUpperCase() : undefined;
    const email = req.body.email ? (req.body.email as string).toLowerCase() : undefined;
    const password = req.body.password ? (req.body.password as string).trim() : undefined;

    try {
      if(!name || !email || !password) {
        throw new Error('Obrigatory items not informed');
      }

      const user = await this.service.execute({ name, email, password });

      return res.status(201).json(user);
    } catch(err) {
      return res.status(400).json(errorWork(err.message || null));
    }
  }
}
