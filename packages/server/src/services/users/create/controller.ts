import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';
import { stringFix } from '~/utils/stringFix';

import { UsersCreateService } from './service';

export class UsersCreateController {
  constructor(private service: UsersCreateService) { }

  async handle(req: Request, res: Response) {
    const name = stringFix(req.body.name, undefined, 'UPPERCASE', 'STRING');
    const email = stringFix(req.body.email, undefined, 'LOWERCASE', 'STRING');
    const password = stringFix(req.body.password, undefined);
    const despPermission = stringFix(req.body.despPermission, '1', 'NONE', 'NUMBER');
    const seguPermission = stringFix(req.body.seguPermission, '1', 'NONE', 'NUMBER');
    const cliePermission = stringFix(req.body.cliePermission, '1', 'NONE', 'NUMBER');
    const userPermission = stringFix(req.body.userPermission, '1', 'NONE', 'NUMBER');
    const workPermission = stringFix(req.body.workPermission, '1', 'NONE', 'NUMBER');

    try {
      if(!name) {
        throw new Error(JSON.stringify({ code: 400, message: 'O item \'name\' é nulo ou indefinido.', details: null }));
      }

      if(!email) {
        throw new Error(JSON.stringify({ code: 400, message: 'O item \'email\' é nulo ou indefinido.', details: null }));
      }

      if(!password) {
        throw new Error(JSON.stringify({ code: 400, message: 'O item \'password\' é nulo ou indefinido.', details: null }));
      }

      const user = await this.service.execute({ name, email, password, despPermission, seguPermission, cliePermission, userPermission, workPermission });
      return res.status(201).json(user);
    } catch(err) {
      return errorWork(res, err.message);
    }
  }
}
