import { createConnection } from 'typeorm';

import { typeormConfig } from '~/config/typeorm';

createConnection(typeormConfig).then(() => {
  console.log('Sucesso ao se conectar no banco de dados!');
});
