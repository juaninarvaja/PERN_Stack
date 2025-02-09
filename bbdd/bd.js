// db.js
const { Sequelize } = require('sequelize');

// Configura la conexión a PostgreSQL
const sequelize = new Sequelize('automotores', 'juani', '123', {
  host: 'localhost',
  dialect: 'postgres',
});

sequelize.authenticate()
  .then(() => console.log('Conexión exitosa con la base de datos'))
  .catch(err => console.error('Error de conexión:', err));

module.exports = sequelize;
