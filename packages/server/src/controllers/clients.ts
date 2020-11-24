import { PrismaClient } from '@prisma/client';
import { Router, Express } from 'express';

const prisma = new PrismaClient();
const router = Router();

router.get('/', async (req, res) => {
  const clientes = await prisma.client.findMany();

  return res.json({
    error: null,
    errorCode: null,
    data: clientes,
  });
});

export default (app: Express) => app.use('/clients', router);
