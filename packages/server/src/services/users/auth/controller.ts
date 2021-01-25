import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';

import { UsersAuthService } from './service';

export class UsersAuthController {
  constructor(private service: UsersAuthService) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const email = req.body.email ? (req.body.email as string).toLowerCase() : undefined;
    const password = req.body.password ? (req.body.password as string).trim() : undefined;

    try {
      if(!email || !password) {
        throw new Error('Obrigatory items not informed');
      }

      const user = await this.service.execute({ email, password });

      return res.status(201).json(user);
    } catch(err) {
      return res.status(400).json(errorWork(err.message || null));
    }
  }
}
