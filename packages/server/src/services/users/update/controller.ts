import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';
import { stringFix } from '~/utils/stringFix';

import { UsersUpdateService } from './service';

export class UsersUpdateController {
  constructor(private service: UsersUpdateService) { }

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const name = stringFix(req.body.name, undefined, 'UPPERCASE', 'STRING');
    const email = stringFix(req.body.email, undefined, 'LOWERCASE', 'STRING');
    const password = stringFix(req.body.password, undefined);
    const despPermission = stringFix(req.body.despPermission, undefined, 'UPPERCASE', 'NUMBER');
    const seguPermission = stringFix(req.body.seguPermission, undefined, 'UPPERCASE', 'NUMBER');
    const cliePermission = stringFix(req.body.cliePermission, undefined, 'UPPERCASE', 'NUMBER');
    const userPermission = stringFix(req.body.userPermission, undefined, 'UPPERCASE', 'NUMBER');
    const workPermission = stringFix(req.body.workPermission, undefined, 'UPPERCASE', 'NUMBER');

    try {
      const user = this.service.execute({ id, name, email, password, despPermission, seguPermission, cliePermission, userPermission, workPermission });
      return res.status(200).json(user);
    } catch(err) {
      return errorWork(res, err.message);
    }
  }
}
