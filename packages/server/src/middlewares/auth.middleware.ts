/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if(!authHeader) {
    return res.json(401).json({ code: 'user-auth-no token provided' });
  }

  const tokenSplit = authHeader.split(' ');

  if(tokenSplit.length !== 2) {
    return res.json(401).json({ code: 'user-auth-token error' });
  }

  const [bearer, token] = tokenSplit;

  if(!/^Bearer$/i.test(bearer)) {
    return res.json(401).json({ code: 'user-auth-token malformated' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decode: { id: string }) => {
    if(err) {
      return res.json(401).json({ code: 'user-auth-token validation fail' });
    }

    req.userId = decode.id;
    next();
  });
};
