import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../init/sequelize';

interface PostsAttributes {
  id: number;
  title: string;
  content: string;
  owner_id: number;
  category_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Some fields are optional when creating a new Post
interface PostsCreationAttributes extends Optional<PostsAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Posts extends Model<PostsAttributes, PostsCreationAttributes> implements PostsAttributes {
  public id!: number;
  public title!: string;
  public content!: string;
  public owner_id!: number;
  public category_id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Posts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Categories',
        key: 'id',
      },
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
    tableName: 'Posts',
    timestamps: true,
  }
);

export default Posts;
