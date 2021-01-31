import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';

import { ClientsListGroupsService } from './service';

export class ClientsListGroupsController {
  constructor(private service: ClientsListGroupsService) { }

  async handle(req: Request, res: Response) {
    try {
      if(!req.user || req.user.clie_permission < 1) {
        throw new Error(JSON.stringify({ code: 401, message: 'User not have permission for this route.' }));
      }

      const groups = await this.service.execute();
      return res.status(200).json(groups);
    } catch(err) {
      return errorWork(res, err.message || null);
    }
  }
}
