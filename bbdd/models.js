// models.js
const { DataTypes } = require('sequelize');
const sequelize = require('./bd');

// Definir el modelo 'Usuario'
const Usuario = sequelize.define('Usuario', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

// Definir el modelo 'Vehiculo'
const Vehiculo = sequelize.define('Vehiculo', {
  marca: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING,
  },
  kilometros: {
    type: DataTypes.INTEGER,
  },
  ano: {
    type: DataTypes.INTEGER,
    validate: {
      isAfter: '1900-01-01',
      max: new Date().getFullYear(),
    },
  },
  estado: {
    type: DataTypes.STRING,
  },
});

// Definir el modelo 'Reserva'
const Reserva = sequelize.define('Reserva', {
  fecha_reserva: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// Relacionar las tablas
Usuario.hasMany(Reserva);
Reserva.belongsTo(Usuario);
Vehiculo.hasMany(Reserva);
Reserva.belongsTo(Vehiculo);

module.exports = { Usuario, Vehiculo, Reserva };
