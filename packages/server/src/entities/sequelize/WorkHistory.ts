import { DataTypes, Model, Sequelize } from 'sequelize';
import { v4 } from 'uuid';

import { IWork } from '../IWork';
import { IWorkHistory } from '../IWorkHistory';

export class WorkHistory extends Model implements IWorkHistory {
  id: string;
  workId: string;
  work: IWork;
  details: string;
  createdAt?: Date;
  updatedAt?: Date;

  static init(connection: Sequelize) {
    super.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: v4(),
      },
      details: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, { sequelize: connection, tableName: 'work_histories' });
  }

  static associate(models: any) {
    this.belongsTo(models.Work, { foreignKey: { name: 'workId', field: 'work_id' }, as: 'work' });
  }
}
