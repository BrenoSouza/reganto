#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var fs      = require('fs');
var path = require('path');

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

// Main application.
var app = express();

// Produção application.
var producao = express();  
producao.get('/', function (req, res) {  
  res.sendfile('./producao/html/index.html');
});

// Breno application.
var breno = express();  
breno.get('/', function (req, res) {
    res.sendfile('./user-breno/html/index.html');  
});

// Rafaela application.
var rafaela = express();  
rafaela.get('/', function (req, res) {
    res.sendfile('./user-rafaela/html/index.html');  
});

// Victor application.
var victor = express();  
victor.get('/', function (req, res) {
    res.sendfile('./user-victor/html/index.html');  
});

// Victor application.
var api = express();  
api.get('/', function (req, res) {
	teste = {
		"dog": ["Dog", "Cane", "Perro", "Hund", "Chien"],
		"cat": ["Cat", "Gatto", "Gato", "Katze", "Chat"],
		"flower": ["Flower", "Fiore", "Flor", "Blume", "Fleur"],
		"coffee": ["Coffee", "Caff\u00e8", "Caf\u00e9", "Kaffee"],
		"c2": ["Construct 2"]
	}
    res.send("{:666}");  
});

// Seting static files path
app.use('/', express.static(__dirname + '/producao/html/'));
app.use('/breno', express.static(__dirname + '/user-breno/html/'));
app.use('/rafaela', express.static(__dirname + '/user-rafaela/html/'));
app.use('/victor', express.static(__dirname + '/user-victor/html/'));


// Mouting applications.
app.use('/', producao);
app.use('/api', api);  
app.use('/breno', breno);
app.use('/rafaela', rafaela);
app.use('/victor', victor);

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	//req.setHeader('Authorization');
	next();
});

// Start listening.
app.listen(server_port, server_ip_address, function(){
  console.log("Listening on " + server_ip_address + ", server_port " + server_port)
});