import { DataTypes, Model, Sequelize } from 'sequelize';
import { v4 } from 'uuid';

import { ILogError } from '../ILogError';

export class LogError extends Model implements ILogError {
  id: string;
  message: string;
  error: string;

  static init(connection: Sequelize) {
    super.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: v4(),
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      error: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    }, { sequelize: connection, tableName: 'log_errors' });
  }
}
