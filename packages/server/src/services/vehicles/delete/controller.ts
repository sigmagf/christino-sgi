import { Request, Response } from 'express';

import { VehiclesDeleteService } from './service';

export class VehiclesDeleteController {
  constructor(private service: VehiclesDeleteService) { }

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    if(!id) {
      return res.status(400).json({ message: 'Invalid sended data.' });
    }

    try {
      await this.service.execute({ id });

      return res.status(200).end();
    } catch(err) {
      return res.status(400).json({ message: err.message || 'Unexpected error.' });
    }
  }
}
