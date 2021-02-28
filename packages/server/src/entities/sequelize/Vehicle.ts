import { Model, DataTypes, Sequelize } from 'sequelize';
import { v4 } from 'uuid';

import { IClient } from '../IClient';
import { IVehicle } from '../IVehicle';

export class Vehicle extends Model implements IVehicle {
  id: string;
  clientId: string;
  client: IClient;
  plate: string;
  renavam: string;
  crv?: string;
  brandModel: string;
  type: string;
  details?: string;
  status: number;
  crlveIncluded?: boolean;
  withdrawalIncluded?: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  static init(connection: Sequelize) {
    super.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: v4(),
      },
      plate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      renavam: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      crv: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      brandModel: {
        field: 'brand_model',
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      details: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1,
      },
      crlveIncluded: {
        field: 'crlve_included',
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      withdrawalIncluded: {
        field: 'withdrawal_included',
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    }, { sequelize: connection, tableName: 'vehicles' });
  }

  static associate(models: any) {
    this.belongsTo(models.Client, { foreignKey: { name: 'clientId', field: 'client_id' }, as: 'client' });
  }
}
