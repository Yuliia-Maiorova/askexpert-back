import { Sequelize } from 'sequelize';

// init the sequelize module
const sequelize = new Sequelize({
  dialect: 'sqlite', // sql dialect that we'll use
  logging: false, // don't show the SQL actions in the console log
  storage: 'DB.sqlite' // filename of the the DB
});

export default sequelize;