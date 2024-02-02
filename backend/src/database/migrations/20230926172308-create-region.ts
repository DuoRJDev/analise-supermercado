import { Model, QueryInterface, DataTypes } from 'sequelize';
import IRegions from '../databaseInterfaces/Regions';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IRegions>>('regions', {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      region: { type: DataTypes.STRING, allowNull: false },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('regions');
  },
};
