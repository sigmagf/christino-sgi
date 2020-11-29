import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors({
  allowedHeaders: 'authorization',
  methods: ['GET', 'SET', 'POST', 'PUT', 'DELETE'],
  origin: '*',
}));

export { app };
