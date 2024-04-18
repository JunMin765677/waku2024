'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pieces', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.TEXT
      },
      little: {
        type: Sequelize.TEXT
      },
      date: {
        type: Sequelize.TEXT
      },
      content: {
        type: Sequelize.TEXT
      },
      tag: {
        type: Sequelize.TEXT
      },
      author: {
        type: Sequelize.TEXT
      },
      cover: {
        type: Sequelize.TEXT
      },
      pre2: {
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
    await queryInterface.dropTable('Pieces');
  }
};