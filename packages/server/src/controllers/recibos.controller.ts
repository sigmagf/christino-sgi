import { PrismaClient } from '@prisma/client';
import { Router, Express } from 'express';

import { IReceipt } from '~/interface';
import { authMiddleware } from '~/middlewares/auth.middleware';

const prisma = new PrismaClient();
const router = Router();

router.get('/', async (req, res) => {
  const data: IReceipt[] = await prisma.receipt.findMany({
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

export default (app: Express) => app.use('/receipts', authMiddleware, router);
