'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.usuario, {through: 'reserva', as: 'prestamos', foreignKey:'idUsuario'})

    }
  }
  usuario.init({
    nombres: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    tipodoc: DataTypes.STRING,
    numdoc: DataTypes.STRING,
    correo: DataTypes.STRING,
    tipo: DataTypes.INTEGER,
    contrasena: DataTypes.STRING,
    imagenPerfil: DataTypes.STRING,
    idioma: DataTypes.STRING,
    prefijo: DataTypes.STRING,
    color: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'usuario',
  });
  return usuario;
};