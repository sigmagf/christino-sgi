import { IClient } from '@christino-sgi/common';
import { Model, Sequelize, DataTypes, Optional } from 'sequelize';
import { v4 } from 'uuid';

type ClientCommonOmit = Omit<IClient, 'createdAt'|'updatedAt'|'createdByUser'|'updatedByUser'>;
type ClientModelAttributes = Omit<ClientCommonOmit, 'createdBy'|'updatedBy'>;
type ClientCreationAttributes = Optional<ClientModelAttributes, 'id'>;

export class Client extends Model<ClientModelAttributes, ClientCreationAttributes> implements IClient {
  id: string;
  name: string;
  document: string;
  group?: string;
  email?: string;
  phone1?: string;
  phone2?: string;
  createdAt: Date;
  updatedAt: Date;

  static initialize(sequelize: Sequelize) {
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
      document: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      group: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    }, { sequelize, tableName: 'clients' });
  }
}
