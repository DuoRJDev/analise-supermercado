import { Model, QueryInterface, DataTypes } from 'sequelize';
import IMarkets from '../databaseInterfaces/Markets';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IMarkets>>('markets', {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      market: { type: DataTypes.STRING, allowNull: false },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('markets');
  },
};
