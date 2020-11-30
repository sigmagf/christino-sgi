import 'dotenv/config';

import { app } from './app';
import { authMiddleware } from './middlewares/auth.middleware';
import { usersRouter } from './services/users';

app.use('/users', authMiddleware, usersRouter);

app.listen(process.env.PORT || 3001, () => {
  console.clear();
  console.log(`Christino SGI server start on port ${process.env.PORT || 3001}...`);
});
