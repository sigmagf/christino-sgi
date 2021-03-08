import { IClient, IUser, IVehicle } from '@christino-sgi/common';
import { Model, DataTypes, Sequelize, Optional } from 'sequelize';
import { v4 } from 'uuid';

type CreateVehicleProps = Optional<Omit<IVehicle, 'client'|'createdByUser'|'updatedByUser'>, 'id'|'createdAt'|'createdBy'|'updatedAt'|'updatedBy'>;

export class Vehicle extends Model<IVehicle, CreateVehicleProps> implements IVehicle {
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
    this.belongsTo(models.User, { foreignKey: { name: 'createdBy', field: 'craeted_by' }, as: 'createdByUser' });
    this.belongsTo(models.User, { foreignKey: { name: 'updatedBy', field: 'updated_by' }, as: 'updatedByUser' });
  }
}
