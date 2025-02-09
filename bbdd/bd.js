// db.js
const { Sequelize } = require('sequelize');

// Configura la conexión a PostgreSQL
const sequelize = new Sequelize('automotores', 'juani', '123', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
