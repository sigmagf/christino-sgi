import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';
import { stringFix } from '~/utils/stringFix';

import { UsersValidService } from './service';

export class UsersValidController {
  constructor(private service: UsersValidService) { }

  async handle(req: Request, res: Response) {
    const id = stringFix(req.userId, undefined, 'LOWERCASE');

    try {
      const user = await this.service.execute({ id });
      return res.status(201).json(user);
    } catch(err) {
      return errorWork(res, err.message || null);
    }
  }
}
