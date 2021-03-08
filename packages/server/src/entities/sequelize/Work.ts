import { IClient, IService, IUser, IWork, IWorkHistory } from '@christino-sgi/common';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { v4 } from 'uuid';

type CreateWorkProps = Optional<Omit<IWork, 'client'|'service'|'histories'|'createdByUser'|'updatedByUser'>, 'id'|'createdAt'|'createdBy'|'updatedAt'|'updatedBy'>;

export class Work extends Model<IWork, CreateWorkProps> implements IWork {
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
    this.belongsTo(models.User, { foreignKey: { name: 'createdBy', field: 'created_by' }, as: 'createdByUser' });
    this.belongsTo(models.User, { foreignKey: { name: 'updatedBy', field: 'updated_by' }, as: 'updatedByUser' });
  }
}
