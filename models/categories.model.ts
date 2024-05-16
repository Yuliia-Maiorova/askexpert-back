import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../init/sequelize';

interface CategoriesAttributes {
  id: number;
  name: string;
  hex_code: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Some fields are optional when creating a new Category
interface CategoriesCreationAttributes extends Optional<CategoriesAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Categories extends Model<CategoriesAttributes, CategoriesCreationAttributes> implements CategoriesAttributes {
  public id!: number;
  public name!: string;
  public hex_code!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Categories.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    hex_code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'Categories',
    timestamps: true,
  }
);

export default Categories;
