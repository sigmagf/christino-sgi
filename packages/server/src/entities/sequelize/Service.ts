import { Model, DataTypes } from 'sequelize';
import { v4 } from 'uuid';

import { sequelize } from '~/config/sequelize';

import { ISector } from '../ISector';
import { IService } from '../IService';

class Service extends Model implements IService {
  id: string;
  name: string;
  sectorId: string;
  sector: ISector;
  createdAt?: Date;
  updatedAt?: Date;
}

Service.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: v4(),
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sectorId: {
    field: 'sector_id',
    type: DataTypes.STRING,
    allowNull: false,
  },
}, { sequelize, tableName: 'services' });

Service.belongsTo(sequelize.models.Sector, { foreignKey: 'sector_id', as: 'sector' });

export { Service };
