var faker = require('faker');
var express = require('express');
var app = express();
var pg = require('pg');
var hstore = require('pg-hstore')();
var models = require('./models');

var restify = require('restify');
var server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/products', function (req, res, next) {
  models.Product
    .findAll()
    .then(function (products){
      res.render('index', {products: products});
    });
});

server.get('/products/:id', function (req, res, next) {
  models.Product
    .findById(req.params.id)
    .then(function (product) {
      res.render('product_view', {product: product});
    });
});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});