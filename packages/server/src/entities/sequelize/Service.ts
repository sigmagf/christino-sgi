import { ISector, IService } from '@christino-sgi/common';
import { Model, DataTypes, Sequelize, Optional } from 'sequelize';
import { v4 } from 'uuid';

import { Sector } from './Sector';

type ServiceModelAttributes = Omit<IService, 'sector'|'createdAt'|'updatedAt'>;
type ServiceCreationAttributes = Optional<ServiceModelAttributes, 'id'>;

export class Service extends Model<ServiceModelAttributes, ServiceCreationAttributes> implements IService {
  id: string;
  name: string;
  sectorId: string;
  createdAt: Date;
  updatedAt: Date;

  sector: ISector;

  static initialize(connection: Sequelize) {
    this.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: v4(),
      },
      sectorId: {
        field: 'sector_id',
        type: DataTypes.UUID,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, { sequelize: connection, tableName: 'services' });
  }

  static associate() {
    this.belongsTo(Sector, { foreignKey: { name: 'sectorId', field: 'sector_id' }, as: 'sector' });
  }
}
