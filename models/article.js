'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  article.init({
    title: DataTypes.TEXT,
    content: DataTypes.TEXT,
    categories: DataTypes.STRING,
    cover: DataTypes.TEXT,
    description: DataTypes.TEXT,
    subtitle: DataTypes.TEXT,
    public: DataTypes.STRING,
    author: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'article',
  });
  return article;
};