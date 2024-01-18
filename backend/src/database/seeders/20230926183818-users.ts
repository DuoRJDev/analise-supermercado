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
          roleId: 1,
          stateId: 1,
          regionId: 1,
          createdAt: '2024-01-12 06:44:09',
          updatedAt: '2024-01-12 06:44:09',
        }
      ],
      {},
    );
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('users', {});
  },
};
