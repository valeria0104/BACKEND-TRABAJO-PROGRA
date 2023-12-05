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
  reserva.init({
    fechainicio: DataTypes.DATE,
    fechafinal: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'reserva',
  });
  return reserva;
};