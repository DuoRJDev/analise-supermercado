import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class States extends Model<InferAttributes<States>,
  InferCreationAttributes<States>> {
  declare id: CreationOptional<number>;
  declare state: CreationOptional<string>;
}

States.init({
  id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  state: { type: DataTypes.STRING, allowNull: false },
}, {
  sequelize: db,
  timestamps: false,
  underscored: false,
});

export default States;