import { QueryInterface, Sequelize } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('productsbought',
      [
        {
          saleId: 1,
          productId: 1,
          unityPrice: 20.00,
          quantity: 10,
          date: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        {
          saleId: 2,
          productId: 2,
          unityPrice: 10.00,
          quantity: 15,
          date: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      ],
      {},
    );
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('productsbought', {});
  },
};
