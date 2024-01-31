import { Model, QueryInterface, DataTypes } from 'sequelize';
import IProducts from '../databaseInterfaces/Products';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IProducts>>('products', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      product: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      brandId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('products');
  },
};
