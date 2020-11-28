import { PrismaClient } from '@prisma/client';
import { Router, Express } from 'express';

import { IRecibo } from '~/interface';

const prisma = new PrismaClient();
const router = Router();

router.get('/', async (req, res) => {
  const data: IRecibo[] = await prisma.receipt.findMany({
    select: {
      id: true,
      client: true,
      vehicle: true,
      details: true,
      status: true,
      issuedOn: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return res.json(data);
});

export default (app: Express) => app.use('/receipts', router);
