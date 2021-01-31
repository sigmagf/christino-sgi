import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';
import { stringFix } from '~/utils/stringFix';

import { UsersUpdateService } from './service';

export class UsersUpdateController {
  constructor(private service: UsersUpdateService) { }

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const name = stringFix(req.body.name, undefined, 'UPPERCASE');
    const email = stringFix(req.body.email, undefined, 'LOWERCASE');
    const password = stringFix(req.body.password, undefined);
    const desp_permission = stringFix(req.body.desp_permission, undefined);
    const segu_permission = stringFix(req.body.segu_permission, undefined);
    const clie_permission = stringFix(req.body.clie_permission, undefined);
    const user_permission = stringFix(req.body.user_permission, undefined);

    try {
      const user = await this.service.execute({ id, name, email, password, desp_permission, segu_permission, clie_permission, user_permission });
      return res.status(200).json(user);
    } catch(err) {
      return errorWork(res, err.message || null);
    }
  }
}
