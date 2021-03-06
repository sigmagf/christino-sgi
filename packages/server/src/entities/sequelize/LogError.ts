import { ILogError, IUser } from '@christino-sgi/common';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { v4 } from 'uuid';

type CreateLogErrorProps = Optional<Omit<ILogError, 'user'>, 'id'|'userId'|'createdAt'|'updatedAt'>;

export class LogError extends Model<ILogError, CreateLogErrorProps> implements ILogError {
  id: string;
  userId?: string;
  user?: IUser;
  message: string;
  error: string;
  createdAt?: string;
  updatedAt?: string;

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

  static associate(models: any) {
    this.belongsTo(models.User, { foreignKey: { name: 'userId', field: 'user_id' }, as: 'user' });
  }
}
