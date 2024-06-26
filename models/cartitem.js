'use strict'

module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define('CartItem', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    CartId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {})
  CartItem.associate = function (models) {
    // define association here
  }
  return CartItem
}
