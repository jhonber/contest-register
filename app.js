
/**
* Module dependencies.
*/

var express = require('express');
var passport = require('passport');

var config = require('./config/config');

require('./config/passport')(passport, config)

var app = express()

// express settings
require('./config/express')(app, config, passport)

require('./config/routes')(app, passport)

// Start the app by listening on <port>

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var port = process.env.PORT || 3000
app.listen(port)
console.log('Contest register started on port ' + port)

// expose app
exports = module.exports = app
