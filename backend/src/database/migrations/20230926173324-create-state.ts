import { Model, QueryInterface, DataTypes } from 'sequelize';
import IStates from '../databaseInterfaces/States';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IStates>>('states', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('states');
  },
};
