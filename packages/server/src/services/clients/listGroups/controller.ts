import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';

import { ClientsListGroupsService } from './service';

export class ClientsListGroupsController {
  constructor(private service: ClientsListGroupsService) { }

  async handle(req: Request, res: Response) {
    try {
      const groups = await this.service.execute();
      return res.status(200).json(groups);
    } catch(err) {
      return errorWork(req, res, err);
    }
  }
}
