var express = require('express');
var path  = require('path');
var flash = require('connect-flash');

module.exports = function(app,config,everyauth){
  // all environments
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, '../app/views'));
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.cookieParser('indiscreet monKEY is typing now'));
  app.use(express.session());
  // To use everyauth
  app.use(everyauth.middleware());
  app.use(flash());

  app.use(app.router);
  app.use(require('less-middleware')({ src: path.join(__dirname, '../public') }));
  app.use(express.static(path.join(__dirname, '../public')));
  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }
}
