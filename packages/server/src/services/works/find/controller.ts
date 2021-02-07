import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';

import { WorksFindService } from './service';

export class WorksFindController {
  constructor(private service: WorksFindService) { }

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const work = await this.service.execute({ id });
      return res.status(200).json(work);
    } catch(err) {
      return errorWork(res, err.message || null);
    }
  }
}
