import { Request, Response } from 'express';

import { vehiclesUpdateService } from '../update';

export class VehiclesUploadCRLVeController {
  constructor() { }

  async handle(req: Request, res: Response) {
    await vehiclesUpdateService.execute({ id: req.params.id, crlveIncluded: true });

    return res.end();
  }
}
