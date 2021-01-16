import { Request, Response } from 'express';

import { IUsersCreateRequestDTO } from './dto';
import { UsersCreateService } from './service';

export class UsersCreateController {
  constructor(private service: UsersCreateService) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body as IUsersCreateRequestDTO;

    try {
      const user = await this.service.execute({ name, email, password });

      return res.status(201).json(user);
    } catch(err) {
      return res.status(400).json({ message: err.message || 'Erro inesperado!' });
    }
  }
}
