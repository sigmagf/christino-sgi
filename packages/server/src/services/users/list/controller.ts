import { Request, Response } from 'express';

import { UsersListService } from './service';

export class UsersListController {
  constructor(private service: UsersListService) { }

  async handle(req: Request, res: Response) {
    const page = parseInt(req.query.page as string || '1', 10);
    const limit = parseInt(req.query.limit as string || '10', 10);
    const name = req.query.name as string || undefined;
    const email = req.query.email as string || undefined;

    try {
      const response = await this.service.execute({ page, limit, filters: { name, email } });

      const responseWithoutPassword: typeof response = {
        page: {
          ...response.page,
        },
        data: response.data.map((e) => ({
          ...e,
          password: undefined,
          newEmail: undefined,
          newEmailExpires: undefined,
          newEmailToken: undefined,
          pwdRstExpires: undefined,
          pwdRstToken: undefined,
        })),
      };

      return res.json(responseWithoutPassword);
    } catch(err) {
      return res.status(400).json({ message: err.message || 'Unexpected error.' });
    }
  }
}
