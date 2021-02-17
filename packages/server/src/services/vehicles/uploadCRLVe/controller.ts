import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';

import { vehiclesUpdateService } from '../update';

export class VehiclesUploadCRLVeController {
  constructor() { }

  async handle(req: Request, res: Response) {
    try {
      await vehiclesUpdateService.execute({ id: req.params.id, crlveIncluded: true });

      return res.status(200).send();
    } catch(err) {
      return errorWork(res, err.message);
    }
  }
}
