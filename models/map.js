'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Map extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Map.hasMany(models.spotPicture)
    }
  }
  Map.init({
    city: DataTypes.STRING,
    area: DataTypes.STRING,
    floor: DataTypes.STRING,
    boardKind: DataTypes.STRING,
    location: DataTypes.STRING,
    op1: DataTypes.TEXT,
    lat: DataTypes.TEXT,
    lon: DataTypes.TEXT,
    op4: DataTypes.BOOLEAN,
    op5: DataTypes.BOOLEAN,
    op6: DataTypes.BOOLEAN,
    op7: DataTypes.BOOLEAN,
    op8: DataTypes.BOOLEAN,
    op9: DataTypes.BOOLEAN,
    op10: DataTypes.BOOLEAN,
    opentime: DataTypes.TEXT,
    shop: DataTypes.TEXT,
    googleMap: DataTypes.TEXT,
    picture: DataTypes.TEXT,
    description: DataTypes.TEXT,
    sharer: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Map',
  });
  return Map;
};