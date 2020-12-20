import cors from 'cors';
import express, { Request } from 'express';
import morgan from 'morgan';

import { devMiddleware } from '~/middlewares/dev.middleware';

import { cColors as cc } from './utils/consoleColors';

const app = express();

morgan.token('method', (req: Request) => { return req.method; });
morgan.token('url', (req: Request) => { return req.originalUrl; });
morgan.token('timestamp', () => { return (new Date()).toLocaleString(); });
morgan.token('ip', (req: Request) => { return (req.headers['x-forwarded-for'] || req.connection.remoteAddress).toString(); });

app.use(morgan(`------------------------------------------------------\nTime:   :timestamp\nMethod: ${cc.text.green}${cc.bold}[:method]${cc.reset}\nPath:   ${cc.bold}${cc.text.blue}:url${cc.reset}\nFrom:   :ip`));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  methods: ['GET', 'SET', 'POST', 'PUT', 'DELETE'],
  origin: '*',
}));

if(process.env.NODE_ENV === 'development') {
  app.use(devMiddleware);
}

export { app };
