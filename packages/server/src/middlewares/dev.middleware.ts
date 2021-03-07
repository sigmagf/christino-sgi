import delay from 'delay';
import { NextFunction, Request, Response } from 'express';

export const devMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if(process.env.NODE_ENV === 'development') {
    await delay(1000);

    // console.clear();
    // console.log(`${req.headers['x-forwarded-for'] || req.socket.remoteAddress} [${req.method}] ${req.path}`);
  }

  next();
};
