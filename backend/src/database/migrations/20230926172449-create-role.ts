import { Model, QueryInterface, DataTypes } from 'sequelize';
import IRoles from '../databaseInterfaces/Roles';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IRoles>>('roles', {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      role: { type: DataTypes.STRING, allowNull: false },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('roles');
  },
};
