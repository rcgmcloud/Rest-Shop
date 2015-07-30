'use strict';
module.exports = function(sequelize, DataTypes) {
  var Order = sequelize.define('Order', {
    name: DataTypes.TEXT,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.Order.belongsTo(models.Product);
      }
    }
  });
  return Order;
};