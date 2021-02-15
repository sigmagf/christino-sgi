import { DataTypes, Model, Sequelize } from 'sequelize';
import { v4 } from 'uuid';

import { ISector } from '../ISector';

export class Sector extends Model implements ISector {
  id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;

  static init(connection: Sequelize) {
    super.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: v4(),
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, { sequelize: connection, tableName: 'sectors' });
  }
}
