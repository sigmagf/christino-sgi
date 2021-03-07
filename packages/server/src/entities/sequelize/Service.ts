import { ISector, IService } from '@christino-sgi/common';
import { Model, DataTypes, Sequelize, Optional } from 'sequelize';
import { v4 } from 'uuid';

type CreateServiceProps = Optional<Omit<IService, 'sector'>, 'id'|'createdAt'|'updatedAt'>;

export class Service extends Model<IService, CreateServiceProps> implements IService {
  id: string;
  name: string;
  sectorId: string;
  sector: ISector;
  createdAt: Date;
  updatedAt: Date;

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
    }, { sequelize: connection, tableName: 'services' });
  }

  static associate(models: any) {
    this.belongsTo(models.Sector, { foreignKey: { name: 'sectorId', field: 'sector_id' }, as: 'sector' });
  }
}
