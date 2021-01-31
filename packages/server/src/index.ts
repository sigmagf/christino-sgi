import 'dotenv/config';
import 'reflect-metadata';
import './config/databaseConnect';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import { app } from './app';

app.listen(process.env.PORT || 3000, async () => {
  console.clear();
  console.log(`Servidor iniciado na porta ${process.env.PORT || 3000} no ambiente de ${process.env.NODE_ENV}...`);

  if(!await promisify(fs.existsSync)(path.resolve(__dirname, '..', 'tmp'))) {
    console.log('Criando pasta tmp');
    await promisify(fs.mkdirSync)(path.resolve(__dirname, '..', 'tmp'), {});
  }

  if(!await promisify(fs.existsSync)(path.resolve(__dirname, '..', 'tmp', 's3'))) {
    console.log('Criando pasta tmp/s3');
    await promisify(fs.mkdirSync)(path.resolve(__dirname, '..', 'tmp', 's3'), {});
  }
});
