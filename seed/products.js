var models = require('../models');
var Product = models.Product;
var Inventory = models.Inventory;
var faker = require('faker');

models.sequelize
  .sync({force:true})
  .then(function(){
    var productsArr = [];
    // TO CREATE RANDOM ITEMS
    for(var i=0; i < 4; i++){
      productsArr.push({
      name: faker.commerce.productName(),
      description: "It's " + faker.commerce.productAdjective() + " and "+ faker.commerce.productAdjective() + "!",
      price: parseFloat(faker.commerce.price())
    });
    }
    return Product.bulkCreate(productsArr);
  })
    //fill inventory table
  .then(function(){
    var inventoryArr = [
      {
        quantity: 25,
        product_id: 1
      },
      {
        quantity: 25,
        product_id: 2
      },
      {
        quantity: 25,
        product_id: 3
      },
      {
        quantity: 25,
        product_id: 4
      }
    ];
    return Inventory.bulkCreate(inventoryArr);
});