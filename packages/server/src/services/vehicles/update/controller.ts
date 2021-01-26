import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';

import { VehiclesUpdateService } from './service';

export class VehiclesUpdateController {
  constructor(private service: VehiclesUpdateService) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const name = req.body.name ? (req.body.name as string).toUpperCase() : undefined;
    const document = req.body.document ? (req.body.document as string).toUpperCase() : undefined;
    const group = req.body.group ? (req.body.group as string).toUpperCase() : undefined;

    const plate = req.body.plate ? (req.body.plate as string).toUpperCase() : undefined;
    const renavam = req.body.renavam ? (req.body.renavam as string).toUpperCase() : undefined;
    const crv = req.body.crv ? (req.body.crv as string).toUpperCase() : undefined;
    const brand_model = req.body.brand_model ? (req.body.brand_model as string).toUpperCase() : undefined;
    const type = req.body.type ? (req.body.type as string).toUpperCase() : undefined;
    const details = req.body.details ? (req.body.details as string).toUpperCase() : undefined;
    const status = req.body.status ? (req.body.status as string).toUpperCase() : '1';

    try {
      const user = await this.service.execute({ id, name, document, group, plate, renavam, crv, brand_model, type, details, status });

      return res.status(200).json(user);
    } catch(err) {
      return res.status(400).json(errorWork(err.message || null));
    }
  }
}
