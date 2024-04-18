'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StylePicture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      StylePicture.belongsTo(models.Skater)
    }
  }
  StylePicture.init({
    tag: DataTypes.STRING,
    picture: DataTypes.TEXT,
    content: DataTypes.TEXT,
    pre: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'StylePicture',
  });
  return StylePicture;
};