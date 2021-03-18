import { IWork, IWorkHistory } from '@christino-sgi/common';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { v4 } from 'uuid';

import { Work } from './Work';

type WorkHistoryModelAttributes = Omit<IWorkHistory, 'createdAt'|'updatedAt'>
type WorkHistoryCreationAttributes = Optional<WorkHistoryModelAttributes, 'id'>;

export class WorkHistory extends Model<WorkHistoryModelAttributes, WorkHistoryCreationAttributes> implements IWorkHistory {
  id: string;
  workId: string;
  work: IWork;
  details: string;
  createdAt: Date;
  updatedAt: Date;

  static initialize(connection: Sequelize) {
    this.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: v4(),
      },
      workId: {
        field: 'work_id',
        type: DataTypes.UUID,
        allowNull: false,
      },
      details: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, { sequelize: connection, tableName: 'work_histories' });
  }

  static associate() {
    this.belongsTo(Work, { foreignKey: { name: 'workId', field: 'work_id' }, as: 'work' });
  }
}
