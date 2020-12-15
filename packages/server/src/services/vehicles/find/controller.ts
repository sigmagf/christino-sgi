import { Request, Response } from 'express';

import { VehiclesFindService } from './service';

export class VehiclesFindController {
  constructor(private service: VehiclesFindService) { }

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    if(!id) {
      return res.status(400).json({ message: 'Invalid sended data.' });
    }

    try {
      const response = await this.service.execute({ id });

      return res.json(response);
    } catch(err) {
      return res.status(400).json({ message: err.message || 'Unexpected error.' });
    }
  }
}
