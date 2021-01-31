import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';

import { UsersListService } from './service';

export class UsersListController {
  constructor(private service: UsersListService) { }

  async handle(req: Request, res: Response) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    try {
      if(!req.user || req.user.clie_permission < 1) {
        throw new Error(JSON.stringify({ code: 401, message: 'User not have permission for this route.' }));
      }

      const users = await this.service.execute({ page, limit });
      return res.status(200).json(users);
    } catch(err) {
      return errorWork(res, err.message || null);
    }
  }
}
