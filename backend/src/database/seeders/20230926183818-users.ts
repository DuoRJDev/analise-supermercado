import { QueryInterface, Sequelize } from 'sequelize';
// Atenção à necessidade de criptografar a senha!
// Ou cadastrar uma senha simples e trocá-la
export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('users',
      [
        {
          name: 'Admin',
          surname: 'Master',
          email: 'admin@admin.com',
          password: 'Admin!23',
          role: 1,
          state: 1,
          region: null,
        }
      ],
      {},
    );
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('users', {});
  },
};
