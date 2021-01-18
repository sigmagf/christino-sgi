import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';

import { UsersFindService } from './service';

export class UsersFindController {
  constructor(private service: UsersFindService) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const user = await this.service.execute({ id });

      return res.status(200).json(user);
    } catch(err) {
      return res.status(400).json(errorWork(err.message || null));
    }
  }
}
