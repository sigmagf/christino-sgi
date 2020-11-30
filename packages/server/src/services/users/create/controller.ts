import { Request, Response } from 'express';

import { IUsersCreateRequestDTO } from './dto';
import { UsersCreateService } from './service';

export class UsersCreateController {
  constructor(private service: UsersCreateService) { }

  async handle(req: Request, res: Response) {
    const { name, email, password } = await req.body as IUsersCreateRequestDTO;

    if(!name || !email || !password) {
      return res.status(400).json({ message: 'Invalid sended data.' });
    }

    try {
      const response = await this.service.execute({ name, email, password });
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
