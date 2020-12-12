/* eslint-disable consistent-return */
import delay from 'delay';
import { NextFunction, Request, Response } from 'express';

export const devMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  await delay(1000);

  // console.clear();
  // console.log(`============================ [REQUEST TYPE ${req.method.toUpperCase()}] ============================`);

  next();
};
