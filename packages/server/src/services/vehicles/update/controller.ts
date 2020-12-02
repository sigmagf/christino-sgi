import { Request, Response } from 'express';

import { IVehiclesUpdateRequestDTO } from './dto';
import { VehiclesUpdateService } from './service';

export class VehiclesUpdateController {
  constructor(private service: VehiclesUpdateService) { }

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { plate, renavam, brandModel, type } = req.body as IVehiclesUpdateRequestDTO['vehicle'];

    try {
      const response = await this.service.execute({
        id,
        vehicle: { plate, renavam, brandModel, type },
      });

      return res.json(response);
    } catch(err) {
      return res.status(400).json({ message: err.message || 'Unexpected error.' });
    }
  }
}
