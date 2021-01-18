import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';

import { IVehiclesUpdateRequestDTO } from './dto';
import { VehiclesUpdateService } from './service';

export class VehiclesUpdateController {
  constructor(private service: VehiclesUpdateService) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { client_id, name, document, group, plate, renavam, cla, crv, brand_model, type, details, issued_on, status } = req.body as IVehiclesUpdateRequestDTO;

    try {
      if(!id) {
        throw new Error('Vehicle not found');
      }

      const user = await this.service.execute({ id, client_id, name, document, group, plate, renavam, cla, crv, brand_model, type, details, issued_on, status });

      return res.status(200).json(user);
    } catch(err) {
      return res.status(400).json(errorWork(err.message || null));
    }
  }
}
