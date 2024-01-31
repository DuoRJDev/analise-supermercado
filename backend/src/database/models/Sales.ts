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
  declare userId: CreationOptional<number>;
  declare productId: CreationOptional<number>;
  declare date: CreationOptional<Date>;
  declare price: CreationOptional<number>;
  declare marketId: CreationOptional<number>;
  declare stateId: CreationOptional<number>;
  declare regionId: CreationOptional<number>;
}

Sales.init({
  id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  productId: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false },
  price: { type: DataTypes.DECIMAL, allowNull: false },
  marketId: { type: DataTypes.INTEGER, allowNull: false },
  stateId: { type: DataTypes.INTEGER, allowNull: false },
  regionId: { type: DataTypes.INTEGER, allowNull: true },
}, {
  sequelize: db,
  timestamps: false,
  underscored: false,
  tableName: 'sales',
});

Sales.belongsTo(Users, { foreignKey: 'userId', as: 'user' });
Sales.belongsTo(Products, { foreignKey: 'productId', as: 'product' });
Sales.belongsTo(Markets, { foreignKey: 'marketId', as: 'market' });
Sales.belongsTo(States, { foreignKey: 'stateId', as: 'state' });
Sales.belongsTo(Regions, { foreignKey: 'regionId', as: 'region' });

export default Sales;
