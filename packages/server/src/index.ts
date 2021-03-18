import 'dotenv/config';
import fs from 'fs';
import path from 'path';

import { app } from './app';
import { databaseConnect } from './config/sequelize';

databaseConnect(() => {
  const server = app.listen(process.env.PORT || 3333, async () => {
    console.log(` ✔ Servidor iniciado na porta ${process.env.PORT || 3333} no ambiente '${process.env.NODE_ENV}'.`);
    console.log(` ✔ Utilizando o metodo de upload '${process.env.MULTER_STORAGE.toLocaleLowerCase()}'.`);

    if(process.env.MULTER_STORAGE.toLocaleLowerCase() === 'local') {
      if(!fs.existsSync(path.resolve(__dirname, '..', 'tmp'))) {
        fs.mkdirSync(path.resolve(__dirname, '..', 'tmp'));
      }

      if(!fs.existsSync(path.resolve(__dirname, '..', 'tmp', 'crlve'))) {
        fs.mkdirSync(path.resolve(__dirname, '..', 'tmp', 'crlve'));
      }

      if(!fs.existsSync(path.resolve(__dirname, '..', 'tmp', 'withdrawal'))) {
        fs.mkdirSync(path.resolve(__dirname, '..', 'tmp', 'withdrawal'));
      }
    }
  });

  /* STOP APP ON SERVICE STOP */
  process.on('SIGINT', () => {
    server.close();
    console.log('\n ✗ Servidor encerrado.');
  });
});
