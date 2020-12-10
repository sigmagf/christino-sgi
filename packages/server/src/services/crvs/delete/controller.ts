import { Request, Response } from 'express';

import { ReceiptsDeleteService } from './service';

export class ReceiptsDeleteController {
  constructor(private service: ReceiptsDeleteService) { }

  async handle(req: Request, res: Response) {
    const { clientId, vehicleId } = req.params;

    if(!clientId || !vehicleId) {
      return res.status(400).json({ message: 'Invalid sended data.' });
    }

    try {
      await this.service.execute({ clientId, vehicleId });

      return res.status(200).end();
    } catch(err) {
      return res.status(400).json({ message: err.message || 'Unexpected error.' });
    }
  }
}
