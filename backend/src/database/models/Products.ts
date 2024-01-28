import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import Categories from './Categories';
import Brands from './Brands';

class Products extends Model<InferAttributes<Products>,
  InferCreationAttributes<Products>> {
  declare id: CreationOptional<number>;
  declare product: CreationOptional<string>;
  declare category: CreationOptional<number>;
  declare brand: CreationOptional<number>;
}

Products.init({
  id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  product: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.INTEGER, allowNull: false },
  brand: { type: DataTypes.INTEGER, allowNull: true },
}, {
  sequelize: db,
  timestamps: false,
  underscored: false,
  tableName: 'products',
});
// Corrigir chaves estrangeiras seguir a model User já corrigida, migration e seeders -- RETIRAR COMENTÁRIO APÓS CORREÇÃO
Products.belongsTo(Categories, { foreignKey: 'id', as: 'category' });
Products.belongsTo(Brands, { foreignKey: 'id', as: 'brand' });

export default Products;
