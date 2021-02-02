import 'dotenv/config';
import 'reflect-metadata';
import './config/databaseConnect';
import fs from 'fs';
import path from 'path';

import { app } from './app';

app.listen(process.env.PORT || 3000, async () => {
  console.clear();
  console.log(`Servidor iniciado na porta ${process.env.PORT || 3000} no ambiente '${process.env.NODE_ENV}'.`);

  console.log(`Utilizando o metodo de upload '${process.env.MULTER_STORAGE}'.`);
});
