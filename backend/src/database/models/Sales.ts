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
// Possível refatoração para nome singular, a table representa todos os valores, mas a model representa 1
class Sales extends Model<InferAttributes<Sales>,
  InferCreationAttributes<Sales>> {
  declare id: CreationOptional<number>;
  declare userId: CreationOptional<number>;
  declare date: CreationOptional<Date>;
  declare marketId: CreationOptional<number>;
  declare stateId: CreationOptional<number>;
  declare regionId: CreationOptional<number>;
  declare totalPrice: CreationOptional<number>;
}
// Remover a model 'Regions' e adicionar opções de valores para um campo region
Sales.init({
  id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false },
  marketId: { type: DataTypes.INTEGER, allowNull: false },
  stateId: { type: DataTypes.INTEGER, allowNull: false },
  regionId: { type: DataTypes.INTEGER, allowNull: true },
  totalPrice: { type: DataTypes.DECIMAL, allowNull: false },
}, {
  sequelize: db,
  timestamps: false,
  underscored: false,
  tableName: 'sales',
});

Sales.belongsTo(Users, { foreignKey: 'userId', as: 'user' });
Sales.belongsTo(Markets, { foreignKey: 'marketId', as: 'market' });
Sales.belongsTo(States, { foreignKey: 'stateId', as: 'state' });
Sales.belongsTo(Regions, { foreignKey: 'regionId', as: 'region' });

export default Sales;
