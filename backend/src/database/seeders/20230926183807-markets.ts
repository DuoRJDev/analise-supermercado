import { QueryInterface, Sequelize } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('markets',
      [
        {
          market: 'Guanabara',
        },
        {
          market: 'Mundial',
        },
        {
          market: 'Prezunic',
        },
        {
          market: 'Extra',
        }
      ],
      {},
    );
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('markets', {});
  },
};
