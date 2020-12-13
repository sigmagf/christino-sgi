import { app } from './app';
import { authMiddleware } from './middlewares/auth.middleware';
import { clientsRouter } from './services/clients';
import { crvsRouter } from './services/crvs';
import { usersRouter } from './services/users';
import { vehiclesRouter } from './services/vehicles';

// eslint-disable-next-line global-require
if(process.env.NODE_ENV === 'development') { require('dotenv/config'); }

app.use('/users', usersRouter);
app.use('/clients', authMiddleware, clientsRouter);
app.use('/vehicles', authMiddleware, vehiclesRouter);
app.use('/crvs', authMiddleware, crvsRouter);

app.listen(process.env.PORT || 3000, () => {
  console.clear();
  console.log(`Christino SGI server start on port ${process.env.PORT || 3000}...`);
  console.log(__dirname);
  console.log(process.env.HOME);
});
