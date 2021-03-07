import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';

import { UsersResetPasswordService } from './service';

export class UsersResetPasswordController {
  constructor(private service: UsersResetPasswordService) { }

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await this.service.execute({ id });
      return res.status(200).send();
    } catch(err) {
      return errorWork(res, err);
    }
  }
}
