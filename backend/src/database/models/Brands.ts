import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class Brands extends Model<InferAttributes<Brands>,
  InferCreationAttributes<Brands>> {
  declare id: CreationOptional<number>;
  declare brand: CreationOptional<string>;
}

Brands.init({
  id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  brand: { type: DataTypes.STRING, allowNull: false },
}, {
  sequelize: db,
  timestamps: false,
  underscored: false,
});

export default Brands;
