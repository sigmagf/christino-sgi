import { Request, Response } from 'express';

import { IUsersAuthRequestDTO } from './dto';
import { UsersAuthService } from './service';

export class UsersAuthController {
  constructor(private service: UsersAuthService) { }

  async handle(req: Request, res: Response) {
    const { email, password } = req.body as IUsersAuthRequestDTO;

    if(!email || !password) {
      return res.status(400).json({ message: 'Invalid sended data.' });
    }

    try {
      const response = await this.service.execute({ email, password });
      const responseWithoutPassword: typeof response = {
        user: { ...response.user, password: undefined },
        token: response.token,
      };

      return res.json(responseWithoutPassword);
    } catch(err) {
      return res.status(400).json({ message: err.message || 'Unexpected error.' });
    }
  }
}
