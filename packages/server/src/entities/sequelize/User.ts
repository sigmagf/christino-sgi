import { IUser } from '@christino-sgi/common';
import bcrypt from 'bcryptjs';
import { Model, DataTypes, Sequelize, Optional } from 'sequelize';
import { v4 } from 'uuid';

type CreateUserProps = Optional<Omit<IUser, 'pwdResetToken'|'pwdResetExpires'>, 'id'|'createdAt'|'updatedAt'>;

export class User extends Model<IUser, CreateUserProps> implements IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  despPermission: number;
  seguPermission: number;
  cliePermission: number;
  userPermission: number;
  workPermission: number;
  pwdResetToken?: string;
  pwdResetExpires?: Date;
  createdAt: Date;
  updatedAt: Date;

  static init(connection: Sequelize) {
    super.init({
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
      pwdResetToken: {
        field: 'pwd_reset_token',
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
        defaultValue: null,
      },
      pwdResetExpires: {
        field: 'pwd_reset_expires',
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
    }, { sequelize: connection, tableName: 'users' });
  }
}
