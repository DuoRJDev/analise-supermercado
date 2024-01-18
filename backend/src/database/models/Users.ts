import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import States from './States';
import Regions from './Regions';
import Roles from './Roles';

class Users extends Model<InferAttributes<Users>,
  InferCreationAttributes<Users>> {
  declare id: CreationOptional<number>;
  declare name: CreationOptional<string>;
  declare surname: CreationOptional<string>;
  declare email: CreationOptional<string>;
  declare password: CreationOptional<string>;
  declare roleId: CreationOptional<number>;
  declare stateId: CreationOptional<number>;
  declare regionId: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Users.init({
  id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  surname: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  roleId: { type: DataTypes.INTEGER, allowNull: false },
  stateId: { type: DataTypes.INTEGER, allowNull: true },
  regionId: { type: DataTypes.INTEGER, allowNull: true },
  createdAt: { type: DataTypes.DATE, allowNull: true },
  updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
  sequelize: db,
  timestamps: true,
  underscored: false,
  tableName: 'users',
});

Users.belongsTo(Roles, { foreignKey: 'roleId', as: 'role' });
Users.belongsTo(States, { foreignKey: 'stateId', as: 'state' });
Users.belongsTo(Regions, { foreignKey: 'regionId', as: 'region' });

export default Users;
