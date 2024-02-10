import ProductsBought from '../database/models/ProductsBought';
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
  private modelProductsBought = ProductsBought;
  private modelMarkets = Markets;
  private modelStates = States;
  private modelCategories = Categories;
  private modelBrands = Brands;
  private defaultErrorString = 'Erro ao obter analytics:';

  // eslint-disable-next-line max-lines-per-function
  async getSalesByUser(userEmail: string) {
    try {
      const { modelUsers, modelSales, modelMarkets, modelStates } = this;
      const user = await modelUsers.findOne({ where: { email: userEmail } });
      const sales = await modelSales.findAll({
        where: { userId: user?.dataValues.id },
        attributes: ['id', 'date', 'totalPrice'],
        include: [
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
      console.error(this.defaultErrorString, error);
      throw error;
    }
  }

  // eslint-disable-next-line max-lines-per-function
  async getProductsByUser(userEmail: string) {
    try {
      const { modelUsers, modelSales,
        modelProductsBought, modelProducts, modelBrands, modelCategories } = this;
      const user = await modelUsers.findOne({ where: { email: userEmail } });

      const sales = (await modelSales.findAll({
        where: { userId: user?.dataValues.id },
        attributes: ['id'],
      })).map((sale) => sale.id);
      const allProducts = await modelProductsBought.findAll({
        where: { saleId: sales },
        attributes: ['unityPrice', 'quantity', 'date'],
        include: [
          {
            model: modelProducts,
            attributes: ['product'],
            as: 'product',
            required: true,
            include: [
              {
                model: modelBrands, attributes: ['brand'], as: 'brand', required: true,
              },
              {
                model: modelCategories, attributes: ['category'], as: 'category', required: true,
              },
            ],
          },
        ],
      });
      // const allProducts = await Promise.all(sales
      //   .map((saleId) => modelProductsBought.findAll({
      //     where: { saleId },
      //     attributes: ['unityPrice', 'quantity', 'date'],
      //     include: [
      //       {
      //         model: modelProducts,
      //         attributes: ['product'],
      //         as: 'product',
      //         required: true,
      //         include: [
      //           {
      //             model: modelBrands, attributes: ['brand'], as: 'brand', required: true,
      //           },
      //           {
      //             model: modelCategories, attributes: ['category'], as: 'category', required: true,
      //           },
      //         ],
      //       },
      //     ],
      //   })));
      return allProducts;
    } catch (error) {
      console.error(this.defaultErrorString, error);
      throw error;
    }
  }

  // eslint-disable-next-line max-lines-per-function
  async getAllProductsAnalytics() {
    try {
      const { modelProducts, modelProductsBought, modelCategories, modelBrands } = this;

      const allProducts = await modelProductsBought.findAll({
        attributes: ['unityPrice', 'quantity', 'date'],
        include: [
          {
            model: modelProducts,
            attributes: ['product'],
            as: 'product',
            required: true,
            include: [
              { model: modelCategories, attributes: ['category'], as: 'category', required: true },
              { model: modelBrands, attributes: ['brand'], as: 'brand', required: true },
            ],
          },
        ],
      });
      console.log(allProducts);
    } catch (error) {
      console.error(this.defaultErrorString, error);
      throw error;
    }
  }
}
