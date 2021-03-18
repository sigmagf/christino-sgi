import { Sequelize } from 'sequelize';

import { Client } from '~/entities/sequelize/Client';
import { LogError } from '~/entities/sequelize/LogError';
import { Sector } from '~/entities/sequelize/Sector';
import { Service } from '~/entities/sequelize/Service';
import { User } from '~/entities/sequelize/User';
import { Vehicle } from '~/entities/sequelize/Vehicle';
import { Work } from '~/entities/sequelize/Work';
import { WorkHistory } from '~/entities/sequelize/WorkHistory';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10), // 😑 Realy?
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
  },
});

export function databaseConnect(cb: () => void) {
  console.clear();

  /* ENTITIES INIT */
  // Cashflow.initialize(sequelize);
  // CashflowEntry.initialize(sequelize);
  Client.initialize(sequelize);
  LogError.initialize(sequelize);
  Sector.initialize(sequelize);
  Service.initialize(sequelize);
  User.initialize(sequelize);
  // UserPermission.initialize(sequelize);
  Vehicle.initialize(sequelize);
  Work.initialize(sequelize);
  WorkHistory.initialize(sequelize);

  /* ENTITIES HOOKS */
  // Cashflow.hooks();
  // CashflowEntry.hooks();
  // Client.hooks();
  // Sector.hooks();
  // Service.hooks();
  // User.hooks();
  // UserPermission.hooks();
  // Vehicle.hooks();
  // Work.hooks();
  // WorkHistory.hooks();

  /* ENTITIES RELATIONS */
  // Cashflow.associate();
  // CashflowEntry.associate();
  // Client.associate();
  LogError.associate();
  // Sector.associate();
  Service.associate();
  // User.associate();
  // UserPermission.associate();
  Vehicle.associate();
  Work.associate();
  WorkHistory.associate();

  console.log(` ✔ Conectado ao banco de dados '${sequelize.config.database}' no host '${sequelize.config.host}'.`);

  /* CALLBACK (EXPRESS INIT) */
  cb();

  /* CLOSE CONNECTION ON SERVICE STOP */
  process.on('SIGINT', () => {
    sequelize.connectionManager.close().then(() => {
      console.log(' ✗ Conexão com o banco de dados encerrada.');
    });
  });
}
