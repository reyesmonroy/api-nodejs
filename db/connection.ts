import { Sequelize } from "sequelize";

const db = new Sequelize('node', 'fernando', '123', {
  host: 'localhost',
  dialect: 'mariadb',
});

export default db;