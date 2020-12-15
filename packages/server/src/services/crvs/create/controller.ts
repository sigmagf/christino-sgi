import { Request, Response } from 'express';

import { ICRVsCreateRequestDTO } from './dto';
import { CRVsCreateService } from './service';

export class CRVsCreateController {
  constructor(private service: CRVsCreateService) { }

  async handle(req: Request, res: Response) {
    const { client, vehicle, details, status, issuedOn } = await req.body as ICRVsCreateRequestDTO;

    if(!status || !issuedOn) {
      return res.status(400).json({ message: 'Invalid sended data. [status, issuedOn]' });
    }

    if(!client || !client.name || !client.document) {
      return res.status(400).json({ message: 'Invalid sended data. [client]' });
    }

    if(!vehicle || !vehicle.plate || !vehicle.renavam || !vehicle.brandModel || !vehicle.type) {
      return res.status(400).json({ message: 'Invalid sended data. [vehicle]' });
    }

    try {
      const response = await this.service.execute({ client, vehicle, details, status, issuedOn });

      return res.json(response);
    } catch(err) {
      return res.status(400).json({ message: err.message || 'Unexpected error.' });
    }
  }
}
