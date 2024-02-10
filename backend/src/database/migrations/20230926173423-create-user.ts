import { Model, QueryInterface, DataTypes } from 'sequelize';
import IUsers from '../databaseInterfaces/Users';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IUsers>>('users', {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      surname: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      roleId: { type: DataTypes.INTEGER, allowNull: false },
      stateId: { type: DataTypes.INTEGER, allowNull: true },
      regionId: { type: DataTypes.INTEGER, allowNull: true },
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('users');
  },
};
