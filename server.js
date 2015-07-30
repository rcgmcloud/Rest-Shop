var faker = require('faker');
var express = require('express');
var app = express();

var pg = require('pg');
var hstore = require('pg-hstore')();