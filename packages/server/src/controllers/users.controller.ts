import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Router, Express } from 'express';
import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';

import { authMiddleware } from '~/middlewares/auth.middleware';

const prisma = new PrismaClient();
const router = Router();

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 86400,
  });
};

router.get('/', authMiddleware, async (req, res) => {
  const data = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return res.json(data);
});

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  if(!name || !email || !password) {
    return res.status(400).json({ code: 'user-create-invalid field' });
  }

  if(await prisma.user.findOne({ where: { email } })) {
    return res.status(400).json({ code: 'user-create-email already exists' });
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

  return res.json({
    user: {
      ...data,
      password: undefined,
      newEmail: undefined,
      newEmailToken: undefined,
      newEmailExpires: undefined,
      pwdRstToken: undefined,
      pwdRstExpires: undefined,
    },
    token: generateToken(data.id),
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const data = await prisma.user.findOne({ where: { email } });

  if(!data) {
    return res.status(400).json({ code: 'user-auth-user not exists' });
  }

  if(!await bcrypt.compare(password, data.password)) {
    return res.status(400).json({ code: 'user-auth-password incorrect' });
  }

  return res.json({
    user: {
      ...data,
      password: undefined,
      newEmail: undefined,
      newEmailToken: undefined,
      newEmailExpires: undefined,
      pwdRstToken: undefined,
      pwdRstExpires: undefined,
    },
    token: generateToken(data.id),
  });
});

router.get('/valid', authMiddleware, async (req, res) => {
  const { userId } = req;

  if(!userId) {
    return res.status(400).json({ code: 'user-auth-token not valid' });
  }

  const data = await prisma.user.findOne({ where: { id: userId } });

  if(!data) {
    return res.status(400).json({ code: 'user-auth-user not exists' });
  }

  return res.json({
    ...data,
    password: undefined,
    newEmail: undefined,
    newEmailToken: undefined,
    newEmailExpires: undefined,
    pwdRstToken: undefined,
    pwdRstExpires: undefined,
  });
});

export default (app: Express) => app.use('/users', router);
