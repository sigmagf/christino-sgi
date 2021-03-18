import { IClient, IUser, IVehicle } from '@christino-sgi/common';
import { Model, DataTypes, Sequelize, Optional } from 'sequelize';
import { v4 } from 'uuid';

import { Client } from './Client';
import { User } from './User';

type VehicleCommonOmit = Omit<IVehicle, 'client'|'createdByUser'|'updatedByUser'|'createdAt'|'updatedAt'>;
type VehicleModelAttributes = Omit<VehicleCommonOmit, 'createdBy'|'updatedBy'>;
type VehicleCreationAttributes = Optional<VehicleCommonOmit, 'id'|'createdBy'|'updatedBy'>;

export class Vehicle extends Model<VehicleModelAttributes, VehicleCreationAttributes> implements IVehicle {
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

  static associate() {
    this.belongsTo(Client, { foreignKey: { name: 'clientId', field: 'client_id' }, as: 'client' });
    this.belongsTo(User, { foreignKey: { name: 'createdBy', field: 'created_by' }, as: 'createdByUser' });
    this.belongsTo(User, { foreignKey: { name: 'updatedBy', field: 'updated_by' }, as: 'updatedByUser' });
  }
}
