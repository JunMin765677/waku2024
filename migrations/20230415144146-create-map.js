'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Maps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      city: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      op1: {
        type: Sequelize.TEXT
      },
      lat: {
        type: Sequelize.TEXT
      },
      lon: {
        type: Sequelize.TEXT
      },
      op4: {
        type: Sequelize.BOOLEAN
      },
      op5: {
        type: Sequelize.BOOLEAN
      },
      op6: {
        type: Sequelize.BOOLEAN
      },
      op7: {
        type: Sequelize.BOOLEAN
      },
      op8: {
        type: Sequelize.BOOLEAN
      },
      op9: {
        type: Sequelize.BOOLEAN
      },
      op10: {
        type: Sequelize.BOOLEAN
      },
      opentime: {
        type: Sequelize.TEXT
      },
      shop: {
        type: Sequelize.TEXT
      },
      googleMap: {
        type: Sequelize.TEXT
      },
      picture: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.TEXT
      },
      sharer: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Maps');
  }
};