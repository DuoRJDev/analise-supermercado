import { QueryInterface, Sequelize } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('regions',
      [
        {
          region: 'Norte',
        },
        {
          region: 'Sul',
        },
        {
          region: 'Leste',
        },
        {
          region: 'Oeste',
        },
      ],
      {},
    );
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('regions', {});
  },
};
