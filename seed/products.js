var models = require('../models');
var Product = models.Product;
var faker = require('faker');

models.sequelize
  .sync({force:true})
  .then(function(){
    console.log("Database has been connected. Thank you for choosing Sequelize.");
    //seed our data babies
    var productsArr = [];
    for(var i=0; i < 5; i++){
      productsArr.push({
      name: faker.commerce.productName(),
      description: "It's " + faker.commerce.productAdjective() + " and "+ faker.commerce.productAdjective() + "!",
      price: parseFloat(faker.commerce.price())
    });
    }
    return Product.bulkCreate(productsArr);
});