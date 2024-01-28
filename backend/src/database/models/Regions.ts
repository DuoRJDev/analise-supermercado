import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class Regions extends Model<InferAttributes<Regions>,
  InferCreationAttributes<Regions>> {
  declare id: CreationOptional<number>;
  declare region: CreationOptional<string>;
}

Regions.init({
  id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  region: { type: DataTypes.STRING, allowNull: false },
}, {
  sequelize: db,
  timestamps: false,
  underscored: false,
  tableName: 'regions',
});

export default Regions;
