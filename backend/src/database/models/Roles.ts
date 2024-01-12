import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class Roles extends Model<InferAttributes<Roles>,
  InferCreationAttributes<Roles>> {
  declare id: CreationOptional<number>;
  declare role: CreationOptional<string>;
}

Roles.init({
  id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  role: { type: DataTypes.STRING, allowNull: false },
}, {
  sequelize: db,
  timestamps: false,
  underscored: false,
  tableName: 'roles',
});

export default Roles;
