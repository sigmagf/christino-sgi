import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';

import { UsersForgotPasswordService } from './service';

export class UsersForgotPasswordController {
  constructor(private service: UsersForgotPasswordService) { }

  async handle(req: Request, res: Response) {
    const { email } = req.body;

    try {
      const data = await this.service.execute({ email });
      return res.json(data);
    } catch(err) {
      return errorWork(res, err);
    }
  }
}
