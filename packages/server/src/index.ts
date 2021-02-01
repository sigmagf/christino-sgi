import 'dotenv/config';
import 'reflect-metadata';
import './config/databaseConnect';
import fs from 'fs';
import path from 'path';

import { app } from './app';

app.listen(process.env.PORT || 3000, async () => {
  console.clear();
  console.log(`Servidor iniciado na porta ${process.env.PORT || 3000} no ambiente de ${process.env.NODE_ENV}...`);

  const tmpFolder = process.env.NODE_ENV !== 'development' ? path.resolve(__dirname, '..', '..', 'tmp') : path.resolve(__dirname, '..', 'tmp');

  if(!fs.existsSync(tmpFolder)) {
    console.log('Criando pasta tmp...');
    fs.mkdirSync(tmpFolder);
  }

  if(!fs.existsSync(path.resolve(tmpFolder, 's3'))) {
    console.log('Criando pasta tmp/s3...');
    fs.mkdirSync(path.resolve(tmpFolder, 's3'));
  }

  if(!fs.existsSync(path.resolve(tmpFolder, 'crlve'))) {
    console.log('Criando pasta tmp/crlve...');
    fs.mkdirSync(path.resolve(tmpFolder, 'crlve'));
  }

  console.log(`Utilizando o metodo de upload '${process.env.MULTER_STORAGE}'`);
});
