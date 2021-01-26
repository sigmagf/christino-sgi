import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';
import { stringFix } from '~/utils/stringFix';

import { UsersCreateService } from './service';

export class UsersCreateController {
  constructor(private service: UsersCreateService) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const name = stringFix(req.body.name, undefined, 'UPPERCASE');
    const email = stringFix(req.body.email, undefined, 'LOWERCASE');
    const password = stringFix(req.body.password, undefined);

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
