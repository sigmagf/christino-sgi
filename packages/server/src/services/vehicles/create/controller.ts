import { Request, Response } from 'express';

import { IVehiclesCreateRequestDTO } from './dto';
import { VehiclesCreateService } from './service';

export class VehiclesCreateController {
  constructor(private service: VehiclesCreateService) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { client_id, name, document, group, plate, renavam, cla, crv, brand_model, type, details, issued_on, status } = req.body as IVehiclesCreateRequestDTO;

    try {
      if(!client_id && !name && !document) {
        throw new Error('Cliente nao informado!');
      }

      if(!plate || !renavam || !brand_model || !type || !status) {
        throw new Error('Um ou mais itens obrigatorios nao foram informados!');
      }

      const vehicle = await this.service.execute({ client_id, name, document, group, plate, renavam, cla, crv, brand_model, type, details, issued_on, status });

      return res.status(201).json(vehicle);
    } catch(err) {
      return res.status(400).json({ message: err.message || 'Erro inesperado!' });
    }
  }
}
