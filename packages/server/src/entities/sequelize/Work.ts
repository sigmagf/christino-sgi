import { DataTypes, Model, Sequelize } from 'sequelize';
import { v4 } from 'uuid';

import { IClient } from '../IClient';
import { IService } from '../IService';
import { IWork } from '../IWork';

export class Work extends Model implements IWork {
  id: string;
  clientId: string;
  client: IClient;
  serviceId: string;
  service: IService;
  identifier: string;
  value: number;
  details: string;
  status: number;
  createdAt?: Date;
  updatedAt?: Date;

  static init(connection: Sequelize) {
    super.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: v4(),
      },
      identifier: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      value: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      details: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0,
      },
    }, { sequelize: connection, tableName: 'works' });
  }

  static associate(models: any) {
    this.belongsTo(models.Client, { foreignKey: { name: 'clientId', field: 'client_id' }, as: 'client' });
    this.belongsTo(models.Service, { foreignKey: { name: 'serviceId', field: 'service_id' }, as: 'service' });
    this.hasMany(models.WorkHistory, { foreignKey: { name: 'workId', field: 'work_id' }, as: 'histories' });
  }
}
