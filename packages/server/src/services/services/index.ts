import { Router } from 'express';
import { getRepository } from 'typeorm';

import { Sector } from '~/entities/Sector';
import { Service } from '~/entities/Service';
import { authMiddleware } from '~/middlewares/auth.middleware';

const servicesRouter = Router();

servicesRouter.use(authMiddleware);

servicesRouter.get('/services', async (req, res) => {
  const services = await getRepository(Service).createQueryBuilder('sv').leftJoinAndMapOne('sv.sector', Sector, 'sc', 'sv.sector_id = sc.id').getMany();

  return res.json(services);
});
// servicesRouter.get('/services/:id', (req, res) => servicesFindController.handle(req, res));
// servicesRouter.post('/services', (req, res) => servicesCreateController.handle(req, res));
// servicesRouter.put('/services/:id', (req, res) => servicesUpdateController.handle(req, res));
// servicesRouter.delete('/services/:id', (req, res) => servicesDeleteController.handle(req, res));

// servicesRouter.post('/services/import', (req, res) => servicesImportController.handle(req, res));

export { servicesRouter };
