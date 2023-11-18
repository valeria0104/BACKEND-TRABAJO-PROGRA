'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombres: {
        type: Sequelize.STRING
      },
      apellidos: {
        type: Sequelize.STRING
      },
      tipodoc: {
        type: Sequelize.STRING
      },
      numdoc: {
        type: Sequelize.STRING
      },
      correo: {
        type: Sequelize.STRING
      },
      tipo: {
        type: Sequelize.INTEGER
      },
      contrasena: {
        type: Sequelize.STRING
      },
      imagenPerfil: {
        type: Sequelize.STRING
      },
      idioma: {
        type: Sequelize.STRING
      },
      prefijo: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('usuarios');
  }
};