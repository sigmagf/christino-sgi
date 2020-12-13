import { Request, Response } from 'express';

import { IUsersUpdateRequestDTO } from './dto';
import { UsersUpdateService } from './service';

export class UsersUpdateController {
  constructor(private service: UsersUpdateService) { }

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, password } = req.body as IUsersUpdateRequestDTO['user'];

    try {
      const response = await this.service.execute({
        id,
        user: {
          name,
          email,
          password,
        },
      });

      return res.json(response);
    } catch(err) {
      return res.status(400).json({ message: err.message || 'Unexpected error.' });
    }
  }
}
