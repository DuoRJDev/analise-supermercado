import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class Categories extends Model<InferAttributes<Categories>,
  InferCreationAttributes<Categories>> {
  declare id: CreationOptional<number>;
  declare category: CreationOptional<string>;
}

Categories.init({
  id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  category: { type: DataTypes.STRING, allowNull: false },
}, {
  sequelize: db,
  timestamps: false,
  underscored: false,
});

export default Categories;
