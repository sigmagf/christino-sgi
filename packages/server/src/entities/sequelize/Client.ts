import { DataTypes, Model } from 'sequelize';
import { v4 } from 'uuid';

import { sequelize } from '~/config/sequelize';

import { IClient } from '../IClient';

class Client extends Model implements IClient {
  id: string;
  name: string;
  document: string;
  group?: string;
  email?: string;
  phone1?: string;
  phone2?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

Client.init({
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

export { Client };
