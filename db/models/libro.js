'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class libro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      // define association here
      this.hasMany(models.reserva, {as:'libroreserva', foreignKey:'idLibro'})
      this.belongsToMany(models.usuario, {through: 'reservas', as: 'prestamos', foreignKey:'idLibro'})

     
    }
  }
  libro.init({
    titulo: DataTypes.STRING,
    autor: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    editorial: DataTypes.STRING,
    ISBN: DataTypes.STRING,
    categoria: DataTypes.STRING,
    imagenLibro: DataTypes.STRING,
    cantidadEjemplares: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'libro',
  });
  return libro;
};