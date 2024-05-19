import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  logging: true,
  storage: 'DB.sqlite'
});

export default sequelize;