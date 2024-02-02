import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import db from '.';
import Products from './Products';
import Sales from './Sales';

class ProductsBought extends Model<InferAttributes<ProductsBought>,
  InferCreationAttributes<ProductsBought>> {
  declare id: CreationOptional<number>;
  declare saleId: CreationOptional<number>;
  declare productId: CreationOptional<number>;
  declare unityPrice: CreationOptional<number>;
  declare quantity: CreationOptional<number>;
  declare date: CreationOptional<Date>;
}

ProductsBought.init({
  id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  saleId: { type: DataTypes.INTEGER, allowNull: false },
  productId: { type: DataTypes.INTEGER, allowNull: false },
  unityPrice: { type: DataTypes.INTEGER, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false },
}, {
  sequelize: db,
  timestamps: false,
  underscored: false,
  tableName: 'productsbought',
});

ProductsBought.belongsTo(Products, { foreignKey: 'productId', as: 'product' });
ProductsBought.belongsTo(Sales, { foreignKey: 'saleId', as: 'sale' });

export default ProductsBought;
