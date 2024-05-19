import { Model, DataTypes, Optional } from 'sequelize'
import sequelize from '../init/sequelize'
import User from './user.model';
import Answers from './answers.model';

interface RateUserAnswerAttributes {
    id: number;
    user_id: number;
    answer_id: number;
    rate: number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface RateUserAnswerCreationAttributes extends Optional<RateUserAnswerAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class RateUserAnswer extends Model<RateUserAnswerAttributes, RateUserAnswerCreationAttributes> implements RateUserAnswerAttributes {
    public id!: number;
    public user_id!: number;
    public answer_id!: number;
    public rate!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

RateUserAnswer.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id',
            },
        },
        answer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Answers',
                key: 'id',
            },
        },
        rate: {
            type: DataTypes.INTEGER,
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
        tableName: 'RateUserAnswer',
        timestamps: true,
    }
)

// belongs to
RateUserAnswer.belongsTo(User, { foreignKey: 'user_id' });
RateUserAnswer.belongsTo(Answers, { foreignKey: 'answer_id' });

export default RateUserAnswer;