import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('categories',
      [
        {
          category: 'Açougue',
        },
        {
          category: 'Bebidas',
        },
        {
          category: 'Biscoitos',
        },
        {
          category: 'Bomboniere',
        },
        {
          category: 'Cereais',
        },
        {
          category: 'Conservas',
        },
        {
          category: 'Embutidos',
        },
        {
          category: 'Frios e Laticinios',
        },
        {
          category: 'Higiene Pessoal',
        },
        {
          category: 'Hortifruti',
        },
        {
          category: 'Limpeza',
        },
        {
          category: 'Massas',
        },
        {
          category: 'Padaria',
        },
        {
          category: 'Salgados',
        }
      ],
      {},
    );
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('categories', {});
  },
};
