import { Sequelize } from "sequelize";

const db = new Sequelize('node', 'fernando', '123', {
  host: 'localhost',
  dialect: 'mariadb',
  //logging: false
});

export default db;