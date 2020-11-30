import { Request, Response } from 'express';

import { UsersFindService } from './service';

export class UsersFindController {
  constructor(private service: UsersFindService) { }

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    if(!id) {
      return res.status(400).json({ message: 'Invalid sended data.' });
    }

    try {
      const response = await this.service.execute({ id });
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
