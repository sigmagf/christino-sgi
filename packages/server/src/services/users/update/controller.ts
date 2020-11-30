import { Request, Response } from 'express';

import { IUsersUpdateRequestDTO } from './dto';
import { UsersUpdateService } from './service';

export class UsersUpdateController {
  constructor(private service: UsersUpdateService) { }

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, password } = req.body as IUsersUpdateRequestDTO;

    try {
      const response = await this.service.execute({ id, name, email, password });
      const responseWithoutPassword: typeof response = {
        ...response,
        password: undefined,
        newEmail: undefined,
        newEmailExpires: undefined,
        newEmailToken: undefined,
        pwdRstExpires: undefined,
        pwdRstToken: undefined,
      };

      return res.json(responseWithoutPassword);
    } catch(err) {
      return res.status(400).json({ message: err.message || 'Unexpected error.' });
    }
  }
}
