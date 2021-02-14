import { Request, Response } from 'express';

import { stringFix } from '~/utils/stringFix';

import { UsersUpdateService } from './service';

export class UsersUpdateController {
  constructor(private service: UsersUpdateService) { }

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const name = stringFix(req.body.name, undefined, 'UPPERCASE');
    const email = stringFix(req.body.email, undefined, 'LOWERCASE');
    const password = stringFix(req.body.password, undefined);
    const despPermission = stringFix(req.body.despPermission, undefined);
    const seguPermission = stringFix(req.body.seguPermission, undefined);
    const cliePermission = stringFix(req.body.cliePermission, undefined);
    const userPermission = stringFix(req.body.userPermission, undefined);
    const workPermission = stringFix(req.body.workPermission, undefined);

    try {
      const user = this.service.execute({ id, name, email, password, despPermission, seguPermission, cliePermission, userPermission, workPermission });
      return res.status(200).json(user);
    } catch(err) {
      return res.status(500).json({ code: 500, message: 'Erro inesperado.', details: err.message || null });
    }
  }
}
