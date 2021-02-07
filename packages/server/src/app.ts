import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { getRepository } from 'typeorm';

import { Sector } from './entities/Sector';
import { Service } from './entities/Service';
import { devMiddleware } from './middlewares/dev.middleware';
import { clientsRouter } from './services/clients';
import { usersRouter } from './services/users';
import { vehiclesRouter } from './services/vehicles';
import { worksRouter } from './services/works';

const app = express();

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE'], origin: '*' }));

if(process.env.NODE_ENV === 'development') {
  app.use(devMiddleware);
}
app.use(usersRouter);
app.use(clientsRouter);
app.use(vehiclesRouter);
app.use(worksRouter);
app.get('/services', async (req, res) => {
  const service = await getRepository(Service)
    .createQueryBuilder('sv')
    .leftJoinAndMapOne('sv.sector', Sector, 'sc', 'sv.sector_id = sc.id')
    .orderBy('sv.name', 'ASC')
    .getMany();

  return res.json(service);
});

app.use('*', (req, res) => res.json({ message: 'Hello World!' }));

export { app };
