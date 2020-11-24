import { Express } from 'express';

import clients from './clients';
import crvs from './crvs';

const routes = (app: Express) => {
  clients(app);
  crvs(app);

  app.use('/', (req, res) => {
    res.json({ hello: 'world' });
  });
};

export { routes };
