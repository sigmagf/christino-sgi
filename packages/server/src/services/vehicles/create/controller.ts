import { Request, Response } from 'express';

import { IVehiclesCreateRequestDTO } from './dto';
import { ClientCreateService } from './service';

export class VehiclesCreateController {
  constructor(private service: ClientCreateService) { }

  async handle(req: Request, res: Response) {
    const { plate, renavam, brandModel, type } = await req.body as IVehiclesCreateRequestDTO;

    if(!plate || !renavam || !brandModel || !type) {
      return res.status(400).json({ message: 'Invalid sended data.' });
    }

    try {
      const response = await this.service.execute({ plate, renavam, brandModel, type });

      return res.json(response);
    } catch(err) {
      return res.status(400).json({ message: err.message || 'Unexpected error.' });
    }
  }
}
