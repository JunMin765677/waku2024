'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Skaters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.TEXT
      },
      ig: {
        type: Sequelize.TEXT
      },
      igURL: {
        type: Sequelize.TEXT
      },
      fb: {
        type: Sequelize.TEXT
      },
      fbURL: {
        type: Sequelize.TEXT
      },
      years: {
        type: Sequelize.TEXT
      },
      rules: {
        type: Sequelize.TEXT
      },
      deck: {
        type: Sequelize.TEXT
      },
      trucks: {
        type: Sequelize.TEXT
      },
      wheels: {
        type: Sequelize.TEXT
      },
      bushings: {
        type: Sequelize.TEXT
      },
      bearings: {
        type: Sequelize.TEXT
      },
      brands: {
        type: Sequelize.TEXT
      },
      tops: {
        type: Sequelize.TEXT
      },
      bottoms: {
        type: Sequelize.TEXT
      },
      sneakers: {
        type: Sequelize.TEXT
      },
      cap: {
        type: Sequelize.TEXT
      },
      socks: {
        type: Sequelize.TEXT
      },
      accessories: {
        type: Sequelize.TEXT
      },
      googleID: {
        type: Sequelize.TEXT
      },
      googleName: {
        type: Sequelize.TEXT
      },
      email: {
        type: Sequelize.TEXT
      },
      photo: {
        type: Sequelize.TEXT
      },
      public: {
        type: Sequelize.TEXT
      },
      pre: {
        type: Sequelize.TEXT
      },
      pre: {
        type: Sequelize.TEXT
      },
      pre: {
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
    await queryInterface.dropTable('Skaters');
  }
};