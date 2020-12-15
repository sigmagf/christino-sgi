import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import { devMiddleware } from '~/middlewares/dev.middleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors({
  methods: ['GET', 'SET', 'POST', 'PUT', 'DELETE'],
  origin: '*',
}));

if(process.env.NODE_ENV === 'development') {
  app.use(devMiddleware);
}

export { app };
