'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reserva extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.usuario, {as:'usuarioreserva', foreignKey:'idUsuario'})
      this.belongsTo(models.libro, {as:'libroreserva', foreignKey:'idLibro'})
    }
  }
  Reserva.init(
    {
      fechainicio: DataTypes.DATE,
      fechafinal: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'reserva', // Cambiado a "Reserva" en singular para que coincida con tu base de datos
      tableName: 'reservas',

    }
  );

  return reserva;
};