import { QueryInterface, Sequelize } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('sales',
      [
        {
          user: 1,
          product: 1,
          date: Sequelize.literal('CURRENT_TIMESTAMP'),
          price: 20.00,
          market: 1,
          state: 1,
          region: null,
        }
      ],
      {},
    );
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('sales', {});
  },
};
