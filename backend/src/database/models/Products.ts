import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import Categories from './Categories';
import Brands from './Brands';

class Products extends Model<InferAttributes<Products>,
  InferCreationAttributes<Products>> {
  declare id: CreationOptional<number>;
  declare product: CreationOptional<string>;
  declare categoryId: CreationOptional<number>;
  declare brandId: CreationOptional<number>;
}

Products.init({
  id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  product: { type: DataTypes.STRING, allowNull: false },
  categoryId: { type: DataTypes.INTEGER, allowNull: false },
  brandId: { type: DataTypes.INTEGER, allowNull: true },
}, {
  sequelize: db,
  timestamps: false,
  underscored: false,
  tableName: 'products',
});

Products.belongsTo(Categories, { foreignKey: 'categoryId', as: 'category' });
Products.belongsTo(Brands, { foreignKey: 'brandId', as: 'brand' });

export default Products;
