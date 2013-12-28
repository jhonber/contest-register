//  Requires
var namespace = require('express-namespace');
var express   = require('express');
var everyauth = require('everyauth');
var http      = require('http');
var config    = require('./config/config');
var mongoose  = require('mongoose');

//  Build app
var app = express();


// Settings
require('./config/mongoose')(config,mongoose);
require('./config/everyauth')(everyauth, config);
require('./config/config')(app, config, everyauth);
require('./config/routes')(app);

// Start the app by listening on <port>


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
