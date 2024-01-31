import Products from '../database/models/Products';
import Sales from '../database/models/Sales';
import Users from '../database/models/Users';
import Markets from '../database/models/Markets';
import States from '../database/models/States';
import Regions from '../database/models/Regions';
import Categories from '../database/models/Categories';
import Brands from '../database/models/Brands';

export default class AnalyticService {
  private modelUsers = Users;
  private modelSales = Sales;
  private modelProducts = Products;
  private modelMarkets = Markets;
  private modelStates = States;
  private modelRegions = Regions;
  private modelCategory = Categories;
  private modelBrand = Brands;
  // eslint-disable-next-line max-lines-per-function
  async getAllProducts(userEmail: string) {
    const user = await this.modelUsers.findOne({ where: { email: userEmail } });
    const sales = await this.modelSales.findAll({
      where: { userId: user?.dataValues.id },
      attributes: ['id', 'date', 'price'],
      include: [
        {
          model: this.modelUsers,
          attributes: ['name', 'surname', 'email'],
          as: 'user',
          required: true,
        },
        {
          model: this.modelProducts,
          attributes: ['product'],
          as: 'product',
          required: true,
          include: [
            { model: this.modelCategory, attributes: ['category'], as: 'category', required: true },
            { model: this.modelBrand, attributes: ['brand'], as: 'brand', required: true },
          ],
        },
        {
          model: this.modelMarkets, attributes: ['market'], as: 'market', required: true,
        },
        {
          model: this.modelStates, attributes: ['state'], as: 'state', required: true,
        },
      ],
    });
    if (!sales) return { type: 'NOT_FOUND', sales };
    return { type: 'OK', sales };
  }
}
