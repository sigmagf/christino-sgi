import { Request, Response } from 'express';

import { IUsersAuthRequestDTO } from './dto';
import { UsersAuthService } from './service';

export class UsersAuthController {
  constructor(private service: UsersAuthService) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body as IUsersAuthRequestDTO;

    try {
      const user = await this.service.execute({ email, password });

      return res.status(201).json(user);
    } catch(err) {
      return res.status(400).json({ message: err.message || 'Erro inesperado!' });
    }
  }
}
