//  Requires
var namespace = require('express-namespace');
var express   = require('express');
var everyauth = require('everyauth');
var http      = require('http');
var config    = require('./config/config');
var mongoose  = require('mongoose');
var tokens    = require('./config/tokens');


var usersById = {};
var nextUserId = 0;
var usersByGoogleId = {};
var usersByGhId = {};

function addUser (source, sourceUser) {
  var user;
  if (arguments.length === 1) { // password-based
    user = sourceUser = source;
    user.id = ++nextUserId;
    return usersById[nextUserId] = user;
  } else { // non-password-based
    user = usersById[++nextUserId] = {id: nextUserId};
    user[source] = sourceUser;
  }
  return user;
}

everyauth.everymodule
  .findUserById( function (id, callback) {
    callback(null, usersById[id]);
  });

everyauth
  .facebook
    .appId(tokens.fb.appId)
    .appSecret(tokens.fb.appSecret)
    .findOrCreateUser( function (session, accessToken, accessTokenExtra, fbUserMetadata) {
      return usersByFbId[fbUserMetadata.id] ||
        (usersByFbId[fbUserMetadata.id] = addUser('facebook', fbUserMetadata));
    })
    .redirectPath('/');

everyauth.google
  .appId(tokens.google.clientId)
  .appSecret(tokens.google.clientSecret)
  .scope('https://www.googleapis.com/auth/userinfo.profile https://www.google.com/m8/feeds/')
  .findOrCreateUser( function (sess, accessToken, extra, googleUser) {
    googleUser.refreshToken = extra.refresh_token;
    googleUser.expiresIn = extra.expires_in;
    return usersByGoogleId[googleUser.id] || (usersByGoogleId[googleUser.id] = addUser('google', googleUser));
  })
  .redirectPath('/');

everyauth.github
  .appId(tokens.github.appId)
  .appSecret(tokens.github.appSecret)
  .findOrCreateUser( function (sess, accessToken, accessTokenExtra, ghUser) {
      return usersByGhId[ghUser.id] || (usersByGhId[ghUser.id] = addUser('github', ghUser));
  })
  .redirectPath('/');

//  Build app
var app = express();


// Settings
require('./config/mongoose')(config,mongoose);
require('./config/config')(app, config, everyauth);
require('./config/routes')(app);

// Start the app by listening on <port>


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
