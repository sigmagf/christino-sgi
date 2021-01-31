import { Request, Response } from 'express';

import { vehiclesUpdateService } from '../update';

export class VehiclesUploadCRLVeController {
  constructor() { }

  async handle(req: Request, res: Response) {
    await vehiclesUpdateService.execute({ id: req.params.id, crlve_included: true });

    return res.end();
  }
}
