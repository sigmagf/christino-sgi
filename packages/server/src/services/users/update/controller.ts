import { Request, Response } from 'express';

import { IUsersUpdateRequestDTO } from './dto';
import { UsersUpdateService } from './service';

export class UsersUpdateController {
  constructor(private service: UsersUpdateService) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, email, password } = req.body as IUsersUpdateRequestDTO;

    try {
      const user = await this.service.execute({ id, name, email, password });

      return res.status(200).json(user);
    } catch(err) {
      return res.status(400).json({ message: err.message || 'Erro inesperado!' });
    }
  }
}
