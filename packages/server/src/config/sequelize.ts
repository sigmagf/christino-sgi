import { Sequelize } from 'sequelize';

import { Client } from '~/entities/sequelize/Client';
import { LogError } from '~/entities/sequelize/LogError';
import { Sector } from '~/entities/sequelize/Sector';
import { Service } from '~/entities/sequelize/Service';
import { User } from '~/entities/sequelize/User';
import { Vehicle } from '~/entities/sequelize/Vehicle';
import { Work } from '~/entities/sequelize/Work';
import { WorkHistory } from '~/entities/sequelize/WorkHistory';

const sequelize = new Sequelize({
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

Client.init(sequelize);
LogError.init(sequelize);
Sector.init(sequelize);
Service.init(sequelize);
User.init(sequelize);
Vehicle.init(sequelize);
Work.init(sequelize);
WorkHistory.init(sequelize);

LogError.associate(sequelize.models);
Service.associate(sequelize.models);
Vehicle.associate(sequelize.models);
WorkHistory.associate(sequelize.models);
Work.associate(sequelize.models);

export { sequelize };
