import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import { devMiddleware } from '~/middlewares/dev.middleware';
import { clientsRouter } from '~/services/clients';
import { usersRouter } from '~/services/users';
import { vehiclesRouter } from '~/services/vehicles';

import { Sector } from './entities/sequelize/Sector';
import { Service } from './entities/sequelize/Service';
import { worksRouter } from './services/works';

const app = express();

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE'], origin: '*' }));

if(process.env.NODE_ENV === 'development') {
  app.use(devMiddleware);
}

app.use((req, res, next) => { res.set('X-Powered-By', 'Furlan Solutions'); next(); });
app.use(usersRouter);
app.use(clientsRouter);
app.use(vehiclesRouter);
app.use(worksRouter);

app.get('/services', async (req, res) => {
  const services = await Service.findAll({ include: { all: true, nested: true } });
  return res.json(services);
});

app.get('/sectors', async (req, res) => {
  const sectors = await Sector.findAll();
  return res.json(sectors);
});

app.use('*', (req, res) => res.status(404).json({ code: 404, message: 'Route not found', details: null }));

export { app };
