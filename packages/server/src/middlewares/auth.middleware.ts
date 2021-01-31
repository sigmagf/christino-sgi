import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { usersFindService } from '~/services/users/find';
import { errorWork } from '~/utils/errorWork';

function userCanAccessRoute(req: Request, path: string, permLevel: number) {
  if(req.path.includes(path)) {
    if(req.method === 'GET' && permLevel < 1) {
      return false;
    } if((req.method === 'POST' || req.method === 'PUT') && permLevel < 2) {
      return false;
    } if(req.method === 'DELETE' && permLevel < 3) {
      return false;
    }
  }

  return true;
}

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

      if(!userCanAccessRoute(req, '/vehicles', user.desp_permission)) {
        errorWork(res, JSON.stringify({ code: 401, message: 'User not have permission for this route.' }));
        return;
      }

      if(!userCanAccessRoute(req, '/clients', user.clie_permission)) {
        errorWork(res, JSON.stringify({ code: 401, message: 'User not have permission for this route.' }));
        return;
      }

      if(!userCanAccessRoute(req, '/users', user.user_permission)) {
        errorWork(res, JSON.stringify({ code: 401, message: 'User not have permission for this route.' }));
        return;
      }

      if(!userCanAccessRoute(req, '/isurances', user.segu_permission)) {
        errorWork(res, JSON.stringify({ code: 401, message: 'User not have permission for this route.' }));
        return;
      }

      req.user = user;

      next();
      return;
    }

    errorWork(res, JSON.stringify({ code: 401, message: 'User not found.' }));
  });
}
