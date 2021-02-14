import { DataTypes, Model } from 'sequelize';
import { v4 } from 'uuid';

import { sequelize } from '~/config/sequelize';

import { ISector } from '../ISector';

class Sector extends Model implements ISector {
  id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

Sector.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: v4(),
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, { sequelize, tableName: 'sectors' });

export { Sector };
