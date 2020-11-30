import { Request, Response } from 'express';

import { UsersListService } from './service';

export class UsersListController {
  constructor(private service: UsersListService) { }

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
      const response = await this.service.execute({ id, name, email, password });

      const responseWithoutPassword: typeof response = {
        ...response,
        password: undefined,
      };

      return res.json(responseWithoutPassword);
    } catch(err) {
      return res.status(400).json({ message: err.message || 'Unexpected error.' });
    }
  }
}
