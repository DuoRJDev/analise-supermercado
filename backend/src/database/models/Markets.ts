import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class Markets extends Model<InferAttributes<Markets>,
  InferCreationAttributes<Markets>> {
  declare id: CreationOptional<number>;
  declare market: CreationOptional<string>;
}

Markets.init({
  id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  market: { type: DataTypes.STRING, allowNull: false },
}, {
  sequelize: db,
  timestamps: false,
  underscored: false,
});

export default Markets;