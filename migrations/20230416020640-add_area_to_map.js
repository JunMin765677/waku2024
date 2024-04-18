'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('Maps', 'area', {
        type: Sequelize.STRING
      });
  }},

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Maps', 'area');
  }
};
