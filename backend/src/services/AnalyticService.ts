import Brands from '../database/models/Brands';
import Categories from '../database/models/Categories';
import Markets from '../database/models/Markets';
import Products from '../database/models/Products';
import Sales from '../database/models/Sales';
import States from '../database/models/States';
import Users from '../database/models/Users';

export default class AnalyticService {
  private modelUsers = Users;
  private modelSales = Sales;
  private modelProducts = Products;
  private modelMarkets = Markets;
  private modelStates = States;
  private modelCategory = Categories;
  private modelBrand = Brands;
  // eslint-disable-next-line max-lines-per-function
  async getAllProducts(userEmail: string) {
    try {
      const { modelUsers, modelSales, modelProducts,
        modelMarkets, modelStates, modelCategory, modelBrand } = this;
      const user = await modelUsers.findOne({ where: { email: userEmail } });
      const sales = await modelSales.findAll({
        where: { userId: user?.dataValues.id },
        attributes: ['id', 'date', 'price'],
        include: [
          {
            model: modelUsers,
            attributes: ['name', 'surname', 'email'],
            as: 'user',
            required: true,
          },
          {
            model: modelProducts,
            attributes: ['product'],
            as: 'product',
            required: true,
            include: [
              { model: modelCategory, attributes: ['category'], as: 'category', required: true },
              { model: modelBrand, attributes: ['brand'], as: 'brand', required: true },
            ],
          },
          {
            model: modelMarkets, attributes: ['market'], as: 'market', required: true,
          },
          {
            model: modelStates, attributes: ['state'], as: 'state', required: true,
          },
        ],
      });
      return sales;
    } catch (error) {
      console.error('Erro ao obter analytics:', error);
      throw error;
    }
  }
}
