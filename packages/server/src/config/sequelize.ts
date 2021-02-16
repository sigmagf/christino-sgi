import { Sequelize } from 'sequelize';

import { Client } from '~/entities/sequelize/Client';
import { Sector } from '~/entities/sequelize/Sector';
import { Service } from '~/entities/sequelize/Service';
import { User } from '~/entities/sequelize/User';
import { Vehicle } from '~/entities/sequelize/Vehicle';
import { Work } from '~/entities/sequelize/Work';
import { WorkHistory } from '~/entities/sequelize/WorkHistory';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
  },
});

Client.init(sequelize);
Sector.init(sequelize);
Service.init(sequelize);
User.init(sequelize);
Vehicle.init(sequelize);
Work.init(sequelize);
WorkHistory.init(sequelize);

User.hooks();

Service.associate(sequelize.models);
Vehicle.associate(sequelize.models);
WorkHistory.associate(sequelize.models);
Work.associate(sequelize.models);

export { sequelize };
