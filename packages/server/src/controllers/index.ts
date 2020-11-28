import { Express } from 'express';

import clients from './clients.controller';
import recibos from './recibos.controller';
import veiculos from './veiculos.controller';

const routes = (app: Express) => {
  clients(app);
  recibos(app);
  veiculos(app);

  app.use('*', (req, res) => {
    res.json({ hello: 'world' });
  });
};

export { routes };
