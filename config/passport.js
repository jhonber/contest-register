var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var flash = require('connect-flash');
var tokens = require('./tokens');

module.exports = function(passport, config, mongoose){
  var User = require('../app/models/users');

  /*passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());*/

  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    User.findOne({ _id: id }, function (err, user) {
      done(err, user)
    })
  })

  passport.use(new LocalStrategy(User.authenticate()));

  passport.use(new GoogleStrategy({
      clientID : tokens.google.clientID,
      clientSecret : tokens.google.clientSecret,
      callbackURL  : "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {

      User.findOne({ 'google.id': profile.id }, function (err, user) {
        if (!user) {
          user = new User({
            username: profile.displayName,
            email: profile.emails[0].value,
            //username: profile.username,
            provider: 'google',
            google: profile._json
          })
          user.save(function (err) {
            if (err) console.log(err)
            return done(err, user)
          })
        } else {
          return done(err, user)
        }
      })

    /**
      // asynchronous verification, for effect...
      process.nextTick(function () {

        // To keep the example simple, the user's Google profile is returned to
        // represent the logged-in user. In a typical application, you would want
        // to associate the Google account with a user record in your database,
        // and return that user instead.
        console.log("Success");
        return done(null, profile);
      });*/
    }
  ));



  // Connect mongoose
  mongoose.connect('mongodb://localhost/passport_local_mongoose_examples');
}
