import { Model, QueryInterface, DataTypes } from 'sequelize';
import IBrands from '../databaseInterfaces/Brands';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IBrands>>('brands', {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      brand: { type: DataTypes.STRING, allowNull: false },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('brands');
  },
};
