'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Riders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      headshot: {
        type: Sequelize.STRING
      },
      athlete: {
        type: Sequelize.STRING
      },
      nation: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.STRING
      },
      Insta: {
        type: Sequelize.STRING
      },
      InstaLink: {
        type: Sequelize.STRING
      },
      stance: {
        type: Sequelize.STRING
      },
      hometown: {
        type: Sequelize.STRING
      },
      GlobalRank: {
        type: Sequelize.STRING
      },
      OlympicRank: {
        type: Sequelize.STRING
      },
      TWRank: {
        type: Sequelize.STRING
      },
      twStreetRank: {
        type: Sequelize.STRING
      },
      twParkRank: {
        type: Sequelize.STRING
      },
      twoYearsStreet: {
        type: Sequelize.STRING
      },
      twoYearsPark: {
        type: Sequelize.STRING
      },
      twoYearsVert: {
        type: Sequelize.STRING
      },
      alltimeOverall: {
        type: Sequelize.STRING
      },
      alltimeStreet: {
        type: Sequelize.STRING
      },
      alltimePark: {
        type: Sequelize.STRING
      },
      alltimeVert: {
        type: Sequelize.STRING
      },
      sponsors: {
        type: Sequelize.TEXT
      },
      gender: {
        type: Sequelize.STRING
      },
      coach: {
        type: Sequelize.TEXT
      },
      history: {
        type: Sequelize.TEXT
      },
      pre1: {
        type: Sequelize.STRING
      },
      pre2: {
        type: Sequelize.STRING
      },
      pre3: {
        type: Sequelize.STRING
      },
      pre4: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Riders');
  }
};