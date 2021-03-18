import { ILogError, IUser } from '@christino-sgi/common';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { v4 } from 'uuid';

import { User } from './User';

type LogErrorCommonOmit = Omit<ILogError, 'user'|'createdAt'|'updatedAt'>;
type LogErrorModelAttributes = Omit<LogErrorCommonOmit, 'userId'|'user'>;
type CreateLogErrorProps = Optional<LogErrorCommonOmit, 'id'|'userId'>;

export class LogError extends Model<LogErrorModelAttributes, CreateLogErrorProps> implements ILogError {
  id: string;
  userId: string;
  message: string;
  error: string;
  createdAt: string;
  updatedAt: string;

  user: IUser;

  static initialize(connection: Sequelize) {
    this.init({
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

  static associate() {
    this.belongsTo(User, { foreignKey: { name: 'userId', field: 'user_id' }, as: 'user' });
  }
}
