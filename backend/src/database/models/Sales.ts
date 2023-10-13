import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import Markets from './Markets';
import States from './States';
import Regions from './Regions';
import Users from './Users';
import Products from './Products';

class Sales extends Model<InferAttributes<Sales>,
  InferCreationAttributes<Sales>> {
  declare id: CreationOptional<number>;
  declare user: CreationOptional<number>;
  declare product: CreationOptional<number>;
  declare date: CreationOptional<Date>;
  declare price: CreationOptional<number>;
  declare market: CreationOptional<number>;
  declare state: CreationOptional<number>;
  declare region: CreationOptional<number>;
}

Sales.init({
  id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  user: { type: DataTypes.INTEGER, allowNull: false },
  product: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false },
  price: { type: DataTypes.DECIMAL, allowNull: false },
  market: { type: DataTypes.INTEGER, allowNull: false },
  state: { type: DataTypes.INTEGER, allowNull: false },
  region: { type: DataTypes.INTEGER, allowNull: true },
}, {
  sequelize: db,
  timestamps: false,
  underscored: false,
});

Sales.belongsTo(Users, { foreignKey: 'id', as: 'user' });
Sales.belongsTo(Products, { foreignKey: 'id', as: 'product' });
Sales.belongsTo(Markets, { foreignKey: 'id', as: 'market' });
Sales.belongsTo(States, { foreignKey: 'id', as: 'state' });
Sales.belongsTo(Regions, { foreignKey: 'id', as: 'region' });

export default Sales;
