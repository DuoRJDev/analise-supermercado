import { QueryInterface, Sequelize } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('sales',
      [
        {
          userId: 1,
          date: Sequelize.literal('CURRENT_TIMESTAMP'),
          marketId: 1,
          stateId: 1,
          regionId: 1,
          totalPrice: 200.00,
        },
        {
          userId: 1,
          date: Sequelize.literal('CURRENT_TIMESTAMP'),
          marketId: 1,
          stateId: 1,
          regionId: 1,
          totalPrice: 150.00,
        },
      ],
      {},
    );
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('sales', {});
  },
};
