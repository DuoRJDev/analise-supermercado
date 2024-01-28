import { Model, QueryInterface, DataTypes } from 'sequelize';
import ISales from '../databaseInterfaces/Sales';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<ISales>>('sales', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      market: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      state: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      region: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('sales');
  },
};
