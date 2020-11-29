import { PrismaClient } from '@prisma/client';
import { Router, Express } from 'express';

import { authMiddleware } from '~/middlewares/auth.middleware';

const prisma = new PrismaClient();
const router = Router();

router.get('/', async (req, res) => {
  const data = await prisma.vehicle.findMany();

  return res.json(data);
});

export default (app: Express) => app.use('/vehicles', authMiddleware, router);
