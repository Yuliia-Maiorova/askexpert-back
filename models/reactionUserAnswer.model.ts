import { Model, DataTypes, Optional } from 'sequelize'
import sequelize from '../init/sequelize'
import User from './user.model'
import Answers from './answers.model'

interface ReactionUserAnswerAttributes {
    id: number;
    user_id: number;
    answer_id: number;
    upvote: boolean;
    approve: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

interface ReactionUserAnswerCreationAttributes extends Optional<ReactionUserAnswerAttributes, 'id' | 'upvote' | 'approve' | 'createdAt' | 'updatedAt'> {}

class ReactionUserAnswer extends Model<ReactionUserAnswerAttributes, ReactionUserAnswerCreationAttributes> implements ReactionUserAnswerAttributes {
    public id!: number;
    public user_id!: number;
    public answer_id!: number;
    public upvote!: boolean;
    public approve!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ReactionUserAnswer.init(
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
                model: User,
                key: 'id',
            },
        },
        answer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Answers,
                key: 'id',
            },
        },
        upvote: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        approve: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
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
        tableName: 'ReactionUserAnswer',
    }
)

// belongs to

ReactionUserAnswer.belongsTo(User, {foreignKey: 'user_id'})
ReactionUserAnswer.belongsTo(Answers, {foreignKey: 'answer_id'})

export default ReactionUserAnswer