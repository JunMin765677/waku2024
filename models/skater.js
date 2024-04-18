'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Skater extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Skater.hasMany(models.StylePicture)
    }
  }
  Skater.init({
    name: DataTypes.STRING,
    city: DataTypes.TEXT,
    ig: DataTypes.TEXT,
    igURL: DataTypes.TEXT,
    fb: DataTypes.TEXT,
    fbURL: DataTypes.TEXT,
    years: DataTypes.TEXT,
    rules: DataTypes.TEXT,
    deck: DataTypes.TEXT,
    trucks: DataTypes.TEXT,
    wheels: DataTypes.TEXT,
    bushings: DataTypes.TEXT,
    bearings: DataTypes.TEXT,
    brands: DataTypes.TEXT,
    tops: DataTypes.TEXT,
    bottoms: DataTypes.TEXT,
    sneakers: DataTypes.TEXT,
    cap: DataTypes.TEXT,
    socks: DataTypes.TEXT,
    accessories: DataTypes.TEXT,
    googleID: DataTypes.TEXT,
    googleName: DataTypes.TEXT,
    email: DataTypes.TEXT,
    photo: DataTypes.TEXT,
    public: DataTypes.TEXT,
    pre: DataTypes.TEXT,
    pre: DataTypes.TEXT,
    pre: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Skater',
  });
  return Skater;
};