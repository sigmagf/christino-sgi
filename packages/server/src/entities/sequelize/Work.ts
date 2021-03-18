import { IClient, IService, IUser, IWork, IWorkHistory } from '@christino-sgi/common';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { v4 } from 'uuid';

import { Client } from './Client';
import { Service } from './Service';
import { User } from './User';
import { WorkHistory } from './WorkHistory';

type WorkCommonOmit = Omit<IWork, 'client'|'service'|'histories'|'cashflow'|'createdByUser'|'updatedByUser'|'createdAt'|'updatedAt'>;
type WorkModelAttributes = Omit<WorkCommonOmit, |'createdBy'|'updatedBy'>;
type WorkCreationAttributes = Optional<WorkCommonOmit, 'id'|'value'|'createdBy'|'updatedBy'>;

export class Work extends Model<WorkModelAttributes, WorkCreationAttributes> implements IWork {
  id: string;
  clientId: string;
  client: IClient;
  serviceId: string;
  service: IService;
  identifier: string;
  value: number;
  details: string;
  status: number;
  histories: IWorkHistory[];
  createdAt: Date;
  createdBy?: string;
  createdByUser?: IUser;
  updatedAt: Date;
  updatedBy?: string;
  updatedByUser?: IUser;

  static initialize(connection: Sequelize) {
    this.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: v4(),
      },
      clientId: {
        field: 'client_id',
        type: DataTypes.UUID,
        allowNull: false,
      },
      serviceId: {
        field: 'service_id',
        type: DataTypes.UUID,
        allowNull: false,
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

  static associate() {
    this.belongsTo(Client, { foreignKey: { name: 'clientId', field: 'client_id' }, as: 'client' });
    this.belongsTo(Service, { foreignKey: { name: 'serviceId', field: 'service_id' }, as: 'service' });
    this.hasMany(WorkHistory, { foreignKey: { name: 'workId', field: 'work_id' }, as: 'histories' });
    this.belongsTo(User, { foreignKey: { name: 'createdBy', field: 'created_by' }, as: 'createdByUser' });
    this.belongsTo(User, { foreignKey: { name: 'updatedBy', field: 'updated_by' }, as: 'updatedByUser' });
  }
}
