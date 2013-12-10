var controllers = require('../app/controllers');
var userController = require('../app/controllers/user');
var contestController = require('../app/controllers/contest');
var User = require('../app/models/users');

module.exports = function(app, passport){

  app.get('/', controllers.index);

  app.namespace('/user',function(){
    app.get('/account', ensureAuthenticated, userController.show);
    app.get('/login', userController.login);
    app.post('/login', passport.authenticate('local', { failureRedirect: '/user/login', failureFlash: true }), userController.successLogin );
    app.get('/logout', userController.logout);
    app.get('/register', userController.getRegister);
    app.post('/register', userController.register);
    app.get('/list', userController.list);
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
  res.redirect('/user/login')
}
