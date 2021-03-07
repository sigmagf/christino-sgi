import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';

import { UsersDeleteService } from './service';

export class UsersDeleteController {
  constructor(private service: UsersDeleteService) { }

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await this.service.execute({ id });
      return res.status(200).send();
    } catch(err) {
      return errorWork(req, res, err);
    }
  }
}
