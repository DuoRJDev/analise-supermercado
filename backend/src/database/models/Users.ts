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
  declare role: CreationOptional<number>;
  declare state: CreationOptional<number>;
  declare region: CreationOptional<number>;
}

Users.init({
  id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  surname: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.INTEGER, allowNull: false },
  state: { type: DataTypes.INTEGER, allowNull: true },
  region: { type: DataTypes.INTEGER, allowNull: true },
}, {
  sequelize: db,
  timestamps: false,
  underscored: false,
});

Users.belongsTo(Roles, { foreignKey: 'id', as: 'role' });
Users.belongsTo(States, { foreignKey: 'id', as: 'state' });
Users.belongsTo(Regions, { foreignKey: 'id', as: 'region' });

export default Users;
