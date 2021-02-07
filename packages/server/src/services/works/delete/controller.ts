import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';

import { WorksDeleteService } from './service';

export class WorksDeleteController {
  constructor(private service: WorksDeleteService) { }

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await this.service.execute({ id });
      return res.status(200).send();
    } catch(err) {
      return errorWork(res, err.message || null);
    }
  }
}
