var models = require('../models');
var Product = models.Product;
var Inventory = models.Inventory;
var faker = require('faker');

models.sequelize
  .sync({force:true})
  .then(function(){
    var productsArr = [];
    // TO CREATE RANDOM ITEMS
    for(var i=0; i < 16; i++){
      productsArr.push({
      name: faker.commerce.productName(),
      description: "It's " + faker.commerce.productAdjective() + " and "+ faker.commerce.productAdjective() + "!",
      price: parseFloat(faker.commerce.price(1, 120))
    });
    }
    return Product.bulkCreate(productsArr);
  })
    //fill inventory table
  .then(function(){
    var inventoryArr = [];
    for(var i=0; i < 16; i++){
          inventoryArr.push({
          quantity: Math.floor(Math.random()*(500-10+1)+10),
          product_id: i+1
        });
        }

    return Inventory.bulkCreate(inventoryArr);
});