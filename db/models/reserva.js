'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Reserva extends Model {
    static associate(models) {
      // Define association here
      this.belongsTo(models.usuario, { as: 'usuarioreserva', foreignKey: 'idUsuario' });
      this.belongsTo(models.libro, { as: 'libroreserva', foreignKey: 'idLibro' });
    }
  }
  reserva.init({
    fechainicio: DataTypes.DATE,
    fechafinal: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'reserva',
  });
  return reserva;
};