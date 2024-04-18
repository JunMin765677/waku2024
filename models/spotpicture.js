'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class spotPicture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      spotPicture.belongsTo(models.Map)
    }
  }
  spotPicture.init({
    username: DataTypes.STRING,
    MapId: DataTypes.STRING,
    picture: DataTypes.TEXT,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'spotPicture',
  });
  return spotPicture;
};