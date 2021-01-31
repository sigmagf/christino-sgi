import 'dotenv/config';
import 'reflect-metadata';
import './config/databaseConnect';
import fs from 'fs';
import path from 'path';

import { app } from './app';

app.listen(process.env.PORT || 3000, async () => {
  console.clear();
  console.log(`Servidor iniciado na porta ${process.env.PORT || 3000} no ambiente de ${process.env.NODE_ENV}...`);

  if(!fs.existsSync(path.resolve(__dirname, '..', 'tmp'))) {
    console.log('Criando pasta tmp');
    fs.mkdirSync(path.resolve(__dirname, '..', 'tmp'));
  } else {
    console.log('Pasta tmp ja existe!');
  }

  if(!fs.existsSync(path.resolve(__dirname, '..', 'tmp', 's3'))) {
    console.log('Criando pasta tmp/s3');
    fs.mkdirSync(path.resolve(__dirname, '..', 'tmp', 's3'));
  } else {
    console.log('Pasta tmp/s3 ja existe!');
  }
});
