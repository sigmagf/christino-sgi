import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { usersFindService } from '~/services/users/find';
import { errorWork } from '~/utils/errorWork';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if(!authHeader) {
    errorWork(res, JSON.stringify({ code: 401, message: 'No token provided.' }));
    return;
  }

  const tokenSplit = authHeader.split(' ');

  if(tokenSplit.length !== 2) {
    errorWork(res, JSON.stringify({ code: 401, message: 'Token error.' }));
    return;
  }

  const [bearer, token] = tokenSplit;

  if(!/^Bearer$/i.test(bearer)) {
    errorWork(res, JSON.stringify({ code: 401, message: 'Token malformated.' }));
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decode: { id: string }) => {
    if(err) {
      errorWork(res, JSON.stringify({ code: 401, message: 'Token invalid.' }));
      return;
    }

    if(decode.id) {
      const user = await usersFindService.execute({ id: decode.id });

      if(!user) {
        errorWork(res, JSON.stringify({ code: 401, message: 'User not found.' }));
        return;
      }

      req.user = user;
      next();
      return;
    }

    errorWork(res, JSON.stringify({ code: 401, message: 'User not found.' }));
  });
}
