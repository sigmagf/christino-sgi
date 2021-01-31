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

  if(!fs.existsSync(path.resolve(__dirname, '..', 'tmp', 'crlve'))) {
    console.log('Criando pasta tmp/crlve');
    fs.mkdirSync(path.resolve(__dirname, '..', 'tmp', 'crlve'));
  } else {
    console.log('Pasta tmp/crlve ja existe!');
  }

  console.log(`Utilizando o metodo de upload '${process.env.MULTER_STORAGE}'`);
});
