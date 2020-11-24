import { PrismaClient } from '@prisma/client';
import { Router, Express } from 'express';

const prisma = new PrismaClient();
const router = Router();

router.get('/', async (req, res) => {
  const crvs = await prisma.crv.findMany({
    include: {
      client: true,
      vehicle: true,
    },
  });

  return res.json(crvs);
});

export default (app: Express) => app.use('/crvs', router);
