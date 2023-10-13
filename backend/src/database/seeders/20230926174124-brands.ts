import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('brands',
      [
        {
          brand: 'KitKat',
        },
        {
          brand: 'Lacta',
        },
        {
          brand: 'Coca-Cola',
        },
        {
          brand: 'President',
        },
        {
          brand: 'Red Bull',
        },
        {
          brand: 'Moça',
        },
        {
          brand: 'Monster',
        },
        {
          brand: 'Minalba',
        },
        {
          brand: 'Omo',
        },
        {
          brand: 'Sadia',
        },
        {
          brand: 'Yopro',
        },
        {
          brand: 'União',
        },
        {
          brand: 'Ypê',
        },
        {
          brand: 'Snickers',
        },
        {
          brand: 'Cammil',
        },
        {
          brand: 'Nestle',
        },
        {
          brand: 'Pracanjuba',
        },
        {
          brand: 'Wickbold',
        },
        {
          brand: 'Yoki',
        },
        {
          brand: 'Liza',
        },
        {
          brand: 'Bauducco',
        },
        {
          brand: 'Johnson & Johnson',
        },
        {
          brand: 'Ninho',
        },
        {
          brand: 'Vigor',
        },
        {
          brand: 'Vanish',
        },
        {
          brand: 'Yakult',
        },
        {
          brand: "Jack Daniel's",
        },
        {
          brand: 'Melita',
        },
        {
          brand: '3 Corações',
        },
        {
          brand: 'Andorinha',
        },
        {
          brand: 'Elma Chips',
        },
        {
          brand: 'Qualy',
        },
        {
          brand: 'Guaraná',
        },
        {
          brand: 'Pepsi',
        },
        {
          brand: 'Nutella',
        },
        {
          brand: 'Spaten',
        },
        {
          brand: 'Camil',
        },
        {
          brand: 'Piraquê',
        },
        {
          brand: 'Brahma',
        },
        {
          brand: 'Gatorade',
        },
        {
          brand: 'Colgate',
        },
        {
          brand: 'Mate Leão',
        },
        {
          brand: 'Itambé',
        },
        {
          brand: 'Confort',
        },
        {
          brand: 'Personal Papel',
        },
        {
          brand: 'Pringles',
        },
        {
          brand: 'Fandangos',
        },
      ],
      {},
    );
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('brands', {});
  },
};
