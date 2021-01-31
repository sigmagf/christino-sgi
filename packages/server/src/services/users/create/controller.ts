import { Request, Response } from 'express';

import { errorWork } from '~/utils/errorWork';
import { stringFix } from '~/utils/stringFix';

import { UsersCreateService } from './service';

export class UsersCreateController {
  constructor(private service: UsersCreateService) { }

  async handle(req: Request, res: Response) {
    const name = stringFix(req.body.name, undefined, 'UPPERCASE');
    const email = stringFix(req.body.email, undefined, 'LOWERCASE');
    const password = stringFix(req.body.password, undefined);
    const desp_permission = stringFix(req.body.desp_permission, undefined);
    const segu_permission = stringFix(req.body.segu_permission, undefined);
    const clie_permission = stringFix(req.body.clie_permission, undefined);
    const user_permission = stringFix(req.body.user_permission, undefined);

    try {
      if(!req.user || req.user.clie_permission < 2) {
        throw new Error(JSON.stringify({ code: 401, message: 'User not have permission for this route.' }));
      }

      if(!name) {
        throw new Error(JSON.stringify({ code: 400, message: 'Name is null or undefined.' }));
      }

      if(!email) {
        throw new Error(JSON.stringify({ code: 400, message: 'Email is null or undefined.' }));
      }

      if(!password) {
        throw new Error(JSON.stringify({ code: 400, message: 'Password is null or undefined.' }));
      }

      const user = await this.service.execute({ name, email, password, desp_permission, segu_permission, clie_permission, user_permission });
      return res.status(201).json(user);
    } catch(err) {
      return errorWork(res, err.message || null);
    }
  }
}
