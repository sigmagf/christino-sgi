import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';

import { vehiclesUpdateService } from '../update';

export class VehiclesUploadWithdrawalController {
  constructor() { }

  async handle(req: Request, res: Response) {
    try {
      if(!req.file) {
        throw new Error(JSON.stringify({ code: 400, message: 'Arquivo não enviado.', details: null }));
      }

      await vehiclesUpdateService.execute({ id: req.params.id, withdrawalIncluded: true, updatedBy: req.user.id });
      return res.status(200).send();
    } catch(err) {
      return errorWork(res, err);
    }
  }
}
