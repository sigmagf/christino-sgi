import { Request, Response } from 'express';

import { ICRVsUpdateRequestDTO } from './dto';
import { CRVsUpdateService } from './service';

export class CRVsUpdateController {
  constructor(private service: CRVsUpdateService) { }

  async handle(req: Request, res: Response) {
    const { clientId, vehicleId } = req.params;
    const { details, status, issuedOn } = await req.body as ICRVsUpdateRequestDTO['receipt'];

    if(!clientId || !vehicleId) {
      return res.status(400).json({ message: 'Invalid sended data' });
    }

    try {
      const response = await this.service.execute({
        clientId,
        vehicleId,
        receipt: { details, status, issuedOn },
      });

      return res.json(response);
    } catch(err) {
      return res.status(400).json({ message: err.message || 'Unexpected error.' });
    }
  }
}
