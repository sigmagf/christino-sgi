import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { usersFindService } from '~/services/users/find';

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

// eslint-disable-next-line consistent-return
export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if(!authHeader) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  const tokenSplit = authHeader.split(' ');

  if(tokenSplit.length !== 2) {
    return res.status(401).json({ message: 'Token error.' });
  }

  const [bearer, token] = tokenSplit;

  if(!/^Bearer$/i.test(bearer)) {
    return res.status(401).json({ message: 'Token malformated.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decode: { id: string }) => {
    if(err) {
      return res.status(401).json({ message: 'Token invalid.' });
    }

    if(decode.id) {
      const user = await usersFindService.execute({ id: decode.id });

      if(!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      if(!userCanAccessRoute(req, '/vehicles', user.despPermission)) {
        return res.status(401).json({ message: 'User not have permission for this route.' });
      }

      if(!userCanAccessRoute(req, '/clients', user.cliePermission)) {
        return res.status(401).json({ message: 'User not have permission for this route.' });
      }

      if(!userCanAccessRoute(req, '/users', user.userPermission)) {
        return res.status(401).json({ message: 'User not have permission for this route.' });
      }

      if(!userCanAccessRoute(req, '/isurances', user.seguPermission)) {
        return res.status(401).json({ message: 'User not have permission for this route.' });
      }

      if(!userCanAccessRoute(req, '/works', user.workPermission)) {
        return res.status(401).json({ message: 'User not have permission for this route.' });
      }

      req.user = user;
      return next();
    }

    return res.status(404).json({ message: 'User not found.' });
  });
}
