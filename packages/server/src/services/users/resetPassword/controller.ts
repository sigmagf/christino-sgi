import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';

import { UsersResetPasswordService } from './service';

export class UsersResetPasswordController {
  constructor(private service: UsersResetPasswordService) { }

  async handle(req: Request, res: Response) {
    const { email, token, password } = req.body;

    try {
      await this.service.execute({ email, token, password });
      return res.status(200).send();
    } catch(err) {
      return errorWork(res, err);
    }
  }
}
