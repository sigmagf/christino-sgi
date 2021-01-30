import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { errorWork } from '~/utils/errorWork';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if(!authHeader) {
    res.status(401).json(errorWork('No token provided'));
    return;
  }

  const tokenSplit = authHeader.split(' ');

  if(tokenSplit.length !== 2) {
    res.status(401).json(errorWork('Token error'));
    return;
  }

  const [bearer, token] = tokenSplit;

  if(!/^Bearer$/i.test(bearer)) {
    res.status(401).json(errorWork('Token malformated'));
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decode: { id: string }) => {
    if(err) {
      res.status(401).json(errorWork('Token invalid'));
      return;
    }

    if(decode.id) {
      req.userId = decode.id;
      next();
      return;
    }

    res.status(401).json(errorWork('Token user not found.'));
  });
}
