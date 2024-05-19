import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../init/sequelize';

interface AnswersAttributes {
  id: number;
  owner_id: number;
  post_id: number;
  content: string;
  upvote_counter: number;
  rating: number;
  approve_counter: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Some fields are optional when creating a new Answer
interface AnswersCreationAttributes extends Optional<AnswersAttributes, 'id' | 'rating' | 'upvote_counter' | 'approve_counter' | 'createdAt' | 'updatedAt'> {}

class Answers extends Model<AnswersAttributes, AnswersCreationAttributes> implements AnswersAttributes {
  public id!: number;
  public owner_id!: number;
  public post_id!: number;
  public content!: string;
  public upvote_counter!: number;
  public rating!: number;
  public approve_counter!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Answers.init(
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
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'Posts',
        key: 'id',
      },
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    upvote_counter: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    approve_counter: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
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
    tableName: 'Answers',
    timestamps: true,
  }
);

export default Answers;
