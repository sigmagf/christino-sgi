import 'dotenv/config';
import 'reflect-metadata';
import './database/connect';

import { app } from './app';

app.listen(process.env.PORT || 3000, () => {
  console.clear();
  console.log(`Servidor iniciado na porta ${process.env.PORT || 3000} no ambiente de ${process.env.NODE_ENV}...`);
});
