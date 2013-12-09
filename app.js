//  Requires
var express  = require('express');
var passport = require('passport');
var http   = require('http');
var config = require('./config/config');
var mongoose = require('mongoose');

//  Build app
var app = express();


// Settings
require('./config/passport')(passport, config,mongoose);
require('./config/config')(app, config, passport);
require('./config/routes')(app, passport);

// Start the app by listening on <port>


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
