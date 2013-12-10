var controllers = require('../app/controllers');
var userController = require('../app/controllers/user');
var contestController = require('../app/controllers/contest');
var User = require('../app/models/users');

module.exports = function(app, passport){


  app.get('/', controllers.index);
  app.get('/users', userController.list);

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

  app.get('/register', function(req, res){
    res.render('register', {});
  });

  app.post('/register', function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
      if(err){
        return res.render('/register', {user : req.user , failureFlash : true });
      }
      res.redirect('/');
    });
  });

  app.namespace('/contests', ensureAuthenticated, function(){
    app.get('/', contestController.list);
    app.get('/create', function(req, res){
      res.render('createContest', {});
    });
    app.post('/create', contestController.create);
  });

}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}
