'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Event.hasMany(models.EventPicture)
    }
  }
  Event.init({
    title: DataTypes.STRING,
    location: DataTypes.STRING,
    date: DataTypes.TEXT,
    startAt:DataTypes.STRING,
    endAt:DataTypes.STRING,
    detail: DataTypes.TEXT,
    picture: DataTypes.TEXT,
    tag: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};