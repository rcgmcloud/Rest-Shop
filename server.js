var faker = require('faker');
var express = require('express');
var app = express();
var pg = require('pg');
var hstore = require('pg-hstore')();
var models = require('./models');
var path = require('path');
var bodyParser = require('body-parser');

var restify = require('restify');
var server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

//show all products
server.get('/products', function (req, res, next) {
  models.Product
    .findAll()
    .then(function (products){
      res.render('index', {products: products});
    });
});

//show a single product
server.get('/products/:id', function (req, res, next) {
  models.Product
    .findById(req.params.id)
    .then(function (product) {
      res.render('product_view', {product: product});
    });
});

//post an order
server.post('/orders', function (req, res, next) {
  models.Order
    .create ({
      name: req.body.author,
      product_id: req.body.product,
      quantity: req.body.quantity
    })
    .then (function (order) {
      //subtract order quantity from inventory
    })
  ;
});

//show orders
server.get('/orders', function (req, res, next) {
  models.Order
    .findAll()
    .then(function (orders) {
      res.render('orders', {orders: orders});
    });
});

//show single order
server.get('/orders/:id', function (req, res, next) {
  models.Order
    .findById(req.params.id)
    .then(function (order) {
      res.render('order_view', {order: order});
    });
});


server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});