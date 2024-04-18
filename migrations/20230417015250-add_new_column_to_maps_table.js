'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('Maps', 'floor', {
        type: Sequelize.STRING
      });
      await queryInterface.addColumn('Maps', 'boardKind', {
        type: Sequelize.STRING
      });
  }},
  
  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Maps', 'floor');
    await queryInterface.removeColumn('Maps', 'boardKind');
  }
};
