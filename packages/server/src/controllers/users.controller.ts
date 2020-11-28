import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Router, Express } from 'express';
import { v4 } from 'uuid';

const prisma = new PrismaClient();
const router = Router();

router.get('/', async (req, res) => {
  const data = await prisma.user.findMany();

  return res.json(data);
});

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  if(!name || !email || !password) {
    return res.status(400).json({ code: 'U21' });
  }

  const hash = await bcrypt.hash(password, 10);

  const data = await prisma.user.create({
    data: {
      id: v4(),
      name,
      email,
      password: hash,
    },
  });

  return res.json(data);
});

export default (app: Express) => app.use('/users', router);
