import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import { Sector } from './entities/sequelize/Sector';
import { Service } from './entities/sequelize/Service';
import { authMiddleware } from './middlewares/auth.middleware';
import { devMiddleware } from './middlewares/dev.middleware';
import { routerClients } from './services/clients';
import { routerUsers } from './services/users';
import { routerVehicles } from './services/vehicles';
import { routerWorks } from './services/works';

const app = express();

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE'], origin: '*' }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(devMiddleware);
app.use(authMiddleware);

app.use(routerUsers);
app.use(routerClients);
app.use(routerVehicles);
app.use(routerWorks);

app.get('/services', async (req, res) => {
  const services = await Service.findAll({ include: { all: true, nested: true } });
  return res.json(services);
});

app.get('/sectors', async (req, res) => {
  const sectors = await Sector.findAll();
  return res.json(sectors);
});

app.use('*', (req, res) => res.status(404).json({ code: 404, message: 'Rota não encontrada!', details: null }));

export { app };
