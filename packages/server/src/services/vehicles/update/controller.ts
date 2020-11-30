import { Request, Response } from 'express';

import { IVehiclesUpdateRequestDTO } from './dto';
import { VehiclesUpdateService } from './service';

export class VehiclesUpdateController {
  constructor(private service: VehiclesUpdateService) { }

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { name, document, group } = req.body as IVehiclesUpdateRequestDTO;

    try {
      const response = await this.service.execute({ id, name, document, group });

      return res.json(response);
    } catch(err) {
      return res.status(400).json({ message: err.message || 'Unexpected error.' });
    }
  }
}
