import bcrypt from 'bcryptjs';
import { Model, DataTypes } from 'sequelize';
import { v4 } from 'uuid';

import { sequelize } from '~/config/sequelize';

import { IUser } from '../IUser';

class User extends Model implements IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  pwdResetToken?: string;
  pwdResetExpires?: Date;
  emailChangeToken?: string;
  emailChangeExpires?: Date;
  despPermission: number;
  seguPermission: number;
  cliePermission: number;
  userPermission: number;
  workPermission: number;
  createdAt?: Date;
  updatedAt?: Date;
}

User.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: v4(),
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  despPermission: {
    field: 'desp_permission',
    type: DataTypes.SMALLINT,
    allowNull: false,
    defaultValue: 1,
  },
  seguPermission: {
    field: 'segu_permission',
    type: DataTypes.SMALLINT,
    allowNull: false,
    defaultValue: 1,
  },
  cliePermission: {
    field: 'clie_permission',
    type: DataTypes.SMALLINT,
    allowNull: false,
    defaultValue: 1,
  },
  userPermission: {
    field: 'user_permission',
    type: DataTypes.SMALLINT,
    allowNull: false,
    defaultValue: 1,
  },
  workPermission: {
    field: 'work_permission',
    type: DataTypes.SMALLINT,
    allowNull: false,
    defaultValue: 1,
  },
}, { sequelize, tableName: 'users' });

User.addHook('beforeSave', async (user: User) => {
  if(user.password) {
    const hash = await bcrypt.hash(user.password, 10);
    // eslint-disable-next-line no-param-reassign
    user.password = hash;
  }
});

export { User };
