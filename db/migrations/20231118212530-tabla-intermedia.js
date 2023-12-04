'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('reservas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idUsuario: {
        type: Sequelize.INTEGER,
        references: {
          //model hace referencia a la tabla fisica
          model: "usuarios",
          key: "id",
        },
      },
      idLibro: {
        type: Sequelize.INTEGER,
        references: {
          model: "libros",
          key: "id",
        },
      },
      fecha_inicio: {
        type: Sequelize.DATE
      },
      fecha_final: {
        type: Sequelize.DATE
      },


      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue : new Date()
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue : new Date()
      },

    });
  },


  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('reserva');
  }
};
