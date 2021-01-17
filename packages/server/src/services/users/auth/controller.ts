import { Request, Response } from 'express';

import { errorWork } from '~/utils/errrorWork';

import { IUsersAuthRequestDTO } from './dto';
import { UsersAuthService } from './service';

export class UsersAuthController {
  constructor(private service: UsersAuthService) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body as IUsersAuthRequestDTO;

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
