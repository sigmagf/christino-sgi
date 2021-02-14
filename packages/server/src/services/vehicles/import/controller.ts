import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';

import { VehiclesImportService } from './service';

export class VehiclesImportController {
  constructor(private service: VehiclesImportService) { }

  async handle(req: Request, res: Response) {
    const { data } = req.body;

    try {
      if(!Array.isArray(data)) {
        return res.status(400).json({ code: 400, message: 'Dados enviados inválidos.', details: 'Os dados enviados não sao um array.' });
      }

      await this.service.execute({ data });
      return res.status(201).send();
    } catch(err) {
      return errorWork(res, err.message);
    }
  }
}
