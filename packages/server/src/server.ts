import { app } from './app';
import { authMiddleware } from './middlewares/auth.middleware';
import { clientsRouter } from './services/clients';
import { receiptsRouter } from './services/receipts';
import { usersRouter } from './services/users';
import { vehiclesRouter } from './services/vehicles';

// eslint-disable-next-line global-require
if(process.env.NODE_ENV === 'development') { require('dotenv/config'); }

app.use('/users', usersRouter);
app.use('/clients', authMiddleware, clientsRouter);
app.use('/vehicles', authMiddleware, vehiclesRouter);
app.use('/receipts', authMiddleware, receiptsRouter);

app.listen(process.env.PORT || 3001, () => {
  console.clear();
  console.log(`Christino SGI server start on port ${process.env.PORT || 3001}...`);
});
