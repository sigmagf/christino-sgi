import { ISector } from '@christino-sgi/common';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { v4 } from 'uuid';

type SectorModelAttributes = Omit<ISector, 'createdAt'|'updatedAt'>;
type SectorCreationAttributes = Optional<SectorModelAttributes, 'id'>;

export class Sector extends Model<SectorModelAttributes, SectorCreationAttributes> implements ISector {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  static initialize(connection: Sequelize) {
    this.init({
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
