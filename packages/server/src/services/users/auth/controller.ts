import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';
import { stringFix } from '~/utils/stringFix';

import { UsersAuthService } from './service';

export class UsersAuthController {
  constructor(private service: UsersAuthService) { }

  async handle(req: Request, res: Response) {
    const email = stringFix(req.body.email, undefined, 'LOWERCASE');
    const password = stringFix(req.body.password, undefined);

    try {
      if(!email) {
        throw new Error(JSON.stringify({ code: 400, message: 'Email is null or undefined.' }));
      }

      if(!password) {
        throw new Error(JSON.stringify({ code: 400, message: 'Password is null or undefined.' }));
      }

      const user = await this.service.execute({ email, password });
      return res.status(201).json(user);
    } catch(err) {
      return errorWork(res, err.message || null);
    }
  }
}
