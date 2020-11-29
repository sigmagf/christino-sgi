import { PrismaClient } from '@prisma/client';
import { Router, Express } from 'express';

const prisma = new PrismaClient();
const router = Router();

router.get('/', async (req, res) => {
  const data = await prisma.vehicle.findMany();

  return res.json(data);
});

export default (app: Express) => app.use('/vehicles', router);
