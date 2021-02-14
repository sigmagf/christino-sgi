import { Model, DataTypes } from 'sequelize';
import { v4 } from 'uuid';

import { sequelize } from '~/config/sequelize';

import { IClient } from '../IClient';
import { IVehicle } from '../IVehicle';

class Vehicle extends Model implements IVehicle {
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
  createdAt?: Date;
  updatedAt?: Date;
}

Vehicle.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: v4(),
  },
  clientId: {
    field: 'client_id',
    type: DataTypes.STRING,
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
}, { sequelize, tableName: 'vehicles' });

Vehicle.belongsTo(sequelize.models.Client, { foreignKey: 'client_id', as: 'client' });

export { Vehicle };
