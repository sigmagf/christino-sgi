/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';

export class UsersValidController {
  constructor() { }

  async handle(req: Request, res: Response) {
    try {
      const responseWithoutPassword: typeof req.user = { ...req.user, password: undefined };

      return res.json(responseWithoutPassword);
    } catch(err) {
      return res.status(400).json({ message: err.message || 'Unexpected error.' });
    }
  }
}
