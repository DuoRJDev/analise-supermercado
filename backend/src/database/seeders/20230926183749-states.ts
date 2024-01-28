import { QueryInterface, Sequelize } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('states',
      [
        {
          state: 'Rio de Janeiro',
        },
        {
          state: 'São Paulo',
        }
      ],
      {},
    );
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('states', {});
  },
};
