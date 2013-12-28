var tokens    = require('../config/tokens');

module.exports = function(everyauth, config){
  var User = require('../app/models/users');
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
/*
  function findService (userObject){
    for (key in userObject){
      if(key == 'github'){
        return userObject.github;
      }
      else if(key == 'facebook'){
        return userObject.facebook;
      }
      else if(key == 'google'){
        return userObject.google;
      }
    }
  }
*/
  everyauth.everymodule
    .findUserById( function (id, callback) {
      callback(null, usersById[id]);
      /*dataUser = findService(usersById[id]);

      console.log("2: " + JSON.stringify( dataUser ));


      User.findById(id, function(err, user){
        if(!user){
          user = new User({
            username: dataUser.name,
            email: dataUser.email
          })
          user.save(function (err) {
            if (err) console.log(err)
          })
        }
       else {
          console.log(dataUser.email);
          return;
       }
      });
     */
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

}
