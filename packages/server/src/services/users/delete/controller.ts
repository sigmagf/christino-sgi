import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';

import { UsersDeleteService } from './service';

export class UsersDeleteController {
  constructor(private service: UsersDeleteService) { }

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      if(!req.user || req.user.clie_permission < 3) {
        throw new Error(JSON.stringify({ code: 401, message: 'User not have permission for this route.' }));
      }

      await this.service.execute({ id });
      return res.status(200).send();
    } catch(err) {
      return errorWork(res, err.message || null);
    }
  }
}
