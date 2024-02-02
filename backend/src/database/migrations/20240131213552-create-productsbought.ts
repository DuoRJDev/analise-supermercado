import { Model, QueryInterface, DataTypes } from 'sequelize';
import IProductsBought from '../databaseInterfaces/ProductsBought';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IProductsBought>>('productsbought', {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      productId: { type: DataTypes.INTEGER, allowNull: false },
      saleId: { type: DataTypes.INTEGER, allowNull: false },
      price: { type: DataTypes.DECIMAL, allowNull: false }
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('productsbought');
  },
};
