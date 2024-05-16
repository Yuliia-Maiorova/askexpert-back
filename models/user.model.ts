import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../init/sequelize';

interface UserAttributes {
  id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  isExpert: boolean;
  profilePicture?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

// Some fields are optional when creating a new User
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'profilePicture' | 'createdAt' | 'updatedAt'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public first_name!: string;
  public last_name!: string;
  public isExpert!: boolean;
  public profilePicture!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    isExpert: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
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
    tableName: 'User',
    timestamps: true,
  }
);

export default User;