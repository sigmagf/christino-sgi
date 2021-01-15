import cors from 'cors';
import express, { Request } from 'express';
import morgan from 'morgan';

import { devMiddleware } from '~/middlewares/dev.middleware';

import { consoleColors as cc } from './utils/consoleColors';

const app = express();

morgan.token('method', (req: Request) => { return req.method; });
morgan.token('url', (req: Request) => { return req.originalUrl; });
morgan.token('timestamp', () => { return (new Date()).toLocaleString(); });
morgan.token('ip', (req: Request) => { return req.headers['x-forwarded-for'].toString(); });

app.use(
  morgan(`
    ------------------------------------------------------\n
    Time:   :timestamp\n
    Method: ${cc.text.green}${cc.bold}[:method]${cc.reset}\n
    Path:   ${cc.bold}${cc.text.blue}:url${cc.reset}\n
    From:   :ip
  `),
);

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
