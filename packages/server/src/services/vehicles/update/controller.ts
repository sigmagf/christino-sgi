import { Request, Response } from 'express';

import { stringFix } from '~/utils/stringFix';

import { VehiclesUpdateService } from './service';

export class VehiclesUpdateController {
  constructor(private service: VehiclesUpdateService) { }

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const clientId = stringFix(req.body.clientId, undefined);
    const plate = stringFix(req.body.plate, undefined, 'UPPERCASE');
    const renavam = stringFix(req.body.renavam, undefined, 'UPPERCASE');
    const crv = stringFix(req.body.crv, undefined, 'UPPERCASE');
    const brandModel = stringFix(req.body.brandModel, undefined, 'UPPERCASE');
    const type = stringFix(req.body.type, undefined, 'UPPERCASE');
    const details = stringFix(req.body.details, undefined, 'UPPERCASE');
    const status = stringFix(req.body.status, undefined, 'UPPERCASE');

    try {
      if(!clientId) {
        return res.status(400).json({ code: 400, message: 'O item \'clientId\' é nulo ou indefinido.', details: null });
      }

      if(!plate) {
        return res.status(400).json({ code: 400, message: 'O item \'plate\' é nulo ou indefinido.', details: null });
      }

      if(!renavam) {
        return res.status(400).json({ code: 400, message: 'O item \'renavam\' é nulo ou indefinido.', details: null });
      }

      if(!brandModel) {
        return res.status(400).json({ code: 400, message: 'O item \'brandModel\' é nulo ou indefinido.', details: null });
      }

      if(!type) {
        return res.status(400).json({ code: 400, message: 'O item \'type\' é nulo ou indefinido.', details: null });
      }

      if(!status) {
        return res.status(400).json({ code: 400, message: 'O item \'status\' é nulo ou indefinido.', details: null });
      }

      const user = await this.service.execute({ id, clientId, plate, renavam, crv, brandModel, type, details, status });
      return res.status(200).json(user);
    } catch(err) {
      return res.status(500).json({ code: 500, message: 'Erro inesperado.', details: err.message || null });
    }
  }
}
