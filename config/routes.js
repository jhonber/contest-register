var controllers = require('../app/controllers');
var userController = require('../app/controllers/user');

module.exports = function(app,passport){


  app.get('/', controllers.index);
  app.get('/users', userController.list);

  // Begin cut: passport stuff.
  app.get('/account', ensureAuthenticated, function(req, res){
    res.render('account', { user: req.user });
  });

  app.get('/login', function(req, res){
    res.render('login', { user: req.user, message: req.flash('error') });
  });

  app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
    function(req, res) {
      res.redirect('/');
    });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
  // End cut passport stuff.

}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}
