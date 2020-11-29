import { Express } from 'express';

import clients from './clients.controller';
import receipts from './recibos.controller';
import users from './users.controller';
import vehicles from './veiculos.controller';

const routes = (app: Express) => {
  clients(app);
  receipts(app);
  users(app);
  vehicles(app);

  app.use('*', (req, res) => {
    res.json({ hello: 'world' });
  });
};

export { routes };
