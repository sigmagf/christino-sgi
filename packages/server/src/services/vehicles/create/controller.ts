import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';

import { IVehiclesCreateRequestDTO } from './dto';
import { VehiclesCreateService } from './service';

export class VehiclesCreateController {
  constructor(private service: VehiclesCreateService) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, document, group, plate, renavam, cla, crv, brand_model, type, details, issued_on, status } = req.body as IVehiclesCreateRequestDTO;

    try {
      if(!name && !document) {
        throw new Error('Client not informed');
      }

      if(!plate || !renavam || !brand_model || !type || !status) {
        throw new Error('Obrigatory items not informed');
      }

      const vehicle = await this.service.execute({ name, document, group, plate, renavam, cla, crv, brand_model, type, details, issued_on, status });

      return res.status(201).json(vehicle);
    } catch(err) {
      return res.status(400).json(errorWork(err.message || null));
    }
  }
}
