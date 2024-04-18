'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Picnic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Picnic.init({
    city: DataTypes.STRING,
    location: DataTypes.STRING,
    op1: DataTypes.BOOLEAN,
    op2: DataTypes.BOOLEAN,
    op3: DataTypes.BOOLEAN,
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
    modelName: 'Picnic',
  });
  return Picnic;
};