import { Request, Response } from 'express';

import { CRVsFindService } from './service';

export class CRVsFindController {
  constructor(private service: CRVsFindService) { }

  async handle(req: Request, res: Response) {
    const { clientId, vehicleId } = req.params;

    if(!clientId || !vehicleId) {
      return res.status(400).json({ message: 'Invalid sended data.' });
    }

    try {
      const response = await this.service.execute({ clientId, vehicleId });

      return res.json(response);
    } catch(err) {
      return res.status(400).json({ message: err.message || 'Unexpected error.' });
    }
  }
}
