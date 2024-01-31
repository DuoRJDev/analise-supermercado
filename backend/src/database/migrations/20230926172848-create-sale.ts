import { Model, QueryInterface, DataTypes } from 'sequelize';
import ISales from '../databaseInterfaces/Sales';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<ISales>>('sales', {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      productId: { type: DataTypes.INTEGER, allowNull: false },
      date: { type: DataTypes.DATE, allowNull: false },
      price: { type: DataTypes.INTEGER, allowNull: false },
      marketId: { type: DataTypes.INTEGER, allowNull: true },
      stateId: { type: DataTypes.INTEGER, allowNull: true },
      regionId: { type: DataTypes.INTEGER, allowNull: true },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('sales');
  },
};
