'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rider extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rider.init({
    headshot: DataTypes.STRING,
    athlete: DataTypes.STRING,
    nation: DataTypes.STRING,
    age: DataTypes.STRING,
    Insta: DataTypes.STRING,
    InstaLink: DataTypes.STRING,
    stance: DataTypes.STRING,
    hometown: DataTypes.STRING,
    GlobalRank: DataTypes.STRING,
    OlympicRank: DataTypes.STRING,
    TWRank: DataTypes.STRING,
    twStreetRank: DataTypes.STRING,
    twParkRank: DataTypes.STRING,
    twoYearsStreet: DataTypes.STRING,
    twoYearsPark: DataTypes.STRING,
    twoYearsVert: DataTypes.STRING,
    alltimeOverall: DataTypes.STRING,
    alltimeStreet: DataTypes.STRING,
    alltimePark: DataTypes.STRING,
    alltimeVert: DataTypes.STRING,
    sponsors: DataTypes.TEXT,
    gender: DataTypes.STRING,
    coach: DataTypes.TEXT,
    history: DataTypes.TEXT,
    pre1: DataTypes.STRING,
    pre2: DataTypes.STRING,
    pre3: DataTypes.STRING,
    pre4: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Rider',
  });
  return Rider;
};