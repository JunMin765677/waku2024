'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Interview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Interview.init({
    title: DataTypes.TEXT,
    little: DataTypes.TEXT,
    date: DataTypes.TEXT,
    content: DataTypes.TEXT,
    cover: DataTypes.TEXT,
    tag2: DataTypes.TEXT,
    author: DataTypes.STRING,
    link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Interview',
  });
  return Interview;
};