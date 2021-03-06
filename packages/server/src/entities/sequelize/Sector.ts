import { ISector } from '@christino-sgi/common';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { v4 } from 'uuid';

type CreateSectorProps = Optional<ISector, 'id'|'createdAt'|'updatedAt'>;

export class Sector extends Model<ISector, CreateSectorProps> implements ISector {
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
