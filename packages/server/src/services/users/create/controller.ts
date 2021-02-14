import { Request, Response } from 'express';

import { stringFix } from '~/utils/stringFix';

import { UsersCreateService } from './service';

export class UsersCreateController {
  constructor(private service: UsersCreateService) { }

  async handle(req: Request, res: Response) {
    const name = stringFix(req.body.name, undefined, 'UPPERCASE');
    const email = stringFix(req.body.email, undefined, 'LOWERCASE');
    const password = stringFix(req.body.password, undefined);
    const despPermission = stringFix(req.body.despPermission, '1');
    const seguPermission = stringFix(req.body.seguPermission, '1');
    const cliePermission = stringFix(req.body.cliePermission, '1');
    const userPermission = stringFix(req.body.userPermission, '1');
    const workPermission = stringFix(req.body.workPermission, '1');

    try {
      if(!name) {
        return res.status(400).json({ code: 400, message: 'O item \'name\' é nulo ou indefinido.', details: null });
      }

      if(!email) {
        return res.status(400).json({ code: 400, message: 'O item \'email\' é nulo ou indefinido.', details: null });
      }

      if(!password) {
        return res.status(400).json({ code: 400, message: 'O item \'password\' é nulo ou indefinido.', details: null });
      }

      const user = await this.service.execute({ name, email, password, despPermission, seguPermission, cliePermission, userPermission, workPermission });
      return res.status(201).json(user);
    } catch(err) {
      return res.status(500).json({ code: 500, message: 'Erro inesperado.', details: err.message || null });
    }
  }
}
