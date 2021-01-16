import { Request, Response } from 'express';

import { VehiclesFindService } from './service';

export class VehiclesFindController {
  constructor(private service: VehiclesFindService) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      if(!id) {
        throw new Error('Nenhum Veiculo informado');
      }

      const vehicle = await this.service.execute({ id });

      return res.status(200).json(vehicle);
    } catch(err) {
      return res.status(400).json({ message: err.message || 'Erro inesperado!' });
    }
  }
}
