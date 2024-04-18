'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class View extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  View.init({
    eventId: DataTypes.STRING,
    styleId: DataTypes.STRING,
    spotId: DataTypes.STRING,
    pageId: DataTypes.STRING,
    count: DataTypes.INTEGER,
    monthly: DataTypes.INTEGER,
    interviewId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'View',
  });
  return View;
};