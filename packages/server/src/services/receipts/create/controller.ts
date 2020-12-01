import { Request, Response } from 'express';

import { IReceiptsCreateRequestDTO } from './dto';
import { ReceiptsCreateService } from './service';

export class ReceiptsCreateController {
  constructor(private service: ReceiptsCreateService) { }

  async handle(req: Request, res: Response) {
    const { client, vehicle, details, status, issuedOn } = await req.body as IReceiptsCreateRequestDTO;

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
