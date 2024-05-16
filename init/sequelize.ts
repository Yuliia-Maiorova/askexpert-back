import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  logging: false,
  storage: 'DB.sqlite'
});

export default sequelize;