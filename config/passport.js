var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');


module.exports = function(passport, config, mongoose){
  var User = require('../app/models/users');

  passport.use(new LocalStrategy(User.authenticate()));

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  // Connect mongoose
  mongoose.connect('mongodb://localhost/passport_local_mongoose_examples');
}
