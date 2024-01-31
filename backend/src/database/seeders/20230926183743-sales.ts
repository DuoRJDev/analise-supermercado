import { QueryInterface, Sequelize } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('sales',
      [
        {
          userId: 1,
          productId: 1,
          date: Sequelize.literal('CURRENT_TIMESTAMP'),
          price: 20.00,
          marketId: 1,
          stateId: 1,
          regionId: null,
        }
      ],
      {},
    );
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('sales', {});
  },
};
