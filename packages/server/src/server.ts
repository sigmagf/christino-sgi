import 'dotenv/config';

import { app } from './app';
import { authMiddleware } from './middlewares/auth.middleware';
import { clientsRouter } from './services/clients';
import { usersRouter } from './services/users';

app.use('/users', authMiddleware, usersRouter);
app.use('/clients', authMiddleware, clientsRouter);

app.listen(process.env.PORT || 3001, () => {
  console.clear();
  console.log(`Christino SGI server start on port ${process.env.PORT || 3001}...`);
});
