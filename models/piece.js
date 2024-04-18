'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Piece extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Piece.init({
    title: DataTypes.TEXT,
    little: DataTypes.TEXT,
    date: DataTypes.TEXT,
    content: DataTypes.TEXT,
    tag: DataTypes.TEXT,
    author: DataTypes.TEXT,
    cover: DataTypes.TEXT,
    pre2: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Piece',
  });
  return Piece;
};