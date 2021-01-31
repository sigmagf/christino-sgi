import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';

import { UsersFindService } from './service';

export class UsersFindController {
  constructor(private service: UsersFindService) { }

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await this.service.execute({ id });
      return res.status(200).json(user);
    } catch(err) {
      return errorWork(res, err.message || null);
    }
  }
}
