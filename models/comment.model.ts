import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../init/sequelize';

interface CommentsAttributes {
  id: number;
  owner_id: number;
  answer_id: number;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Some fields are optional when creating a new Comment
interface CommentsCreationAttributes extends Optional<CommentsAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Comments extends Model<CommentsAttributes, CommentsCreationAttributes> implements CommentsAttributes {
  public id!: number;
  public owner_id!: number;
  public answer_id!: number;
  public content!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Comments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    answer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'Answers',
        key: 'id',
      },
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: 'Comments',
    timestamps: true,
  }
);

export default Comments;
