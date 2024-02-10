import { Model, QueryInterface, DataTypes } from 'sequelize';
import ISales from '../databaseInterfaces/Sales';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<ISales>>('sales', {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      date: { type: DataTypes.DATE, allowNull: false },
      marketId: { type: DataTypes.INTEGER, allowNull: true },
      stateId: { type: DataTypes.INTEGER, allowNull: true },
      regionId: { type: DataTypes.INTEGER, allowNull: true },
      totalPrice: { type: DataTypes.INTEGER, allowNull: false },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('sales');
  },
};
