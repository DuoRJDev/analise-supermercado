import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('roles',
      [
        {
          role: 'Admin'
        },
        {
          role: 'User'
        },
        {
          role: 'SeniorUser'
        },
        {
          role: 'Banned'
        },
      ],
      {},
    );
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('roles', {});
  },
};
