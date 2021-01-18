import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
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
      return next();
    }

    return res.status(401).json({ message: 'Token user not found.' });
  });
};
