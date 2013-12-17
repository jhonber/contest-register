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


  app.namespace('/auth', function(){
    app.get('/google',
            passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email'] }),
            function(req,res){/*this function will not be called because the request will be redirected by google*/ });

    app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/user/login' }), userController.loginGoogle);

  });

  app.namespace('/contests', ensureAuthenticated, function(){
    app.get('/', contestController.list);
    app.get('/create', contestController.form);
    app.post('/create', contestController.create);
  });

}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/user/login')
}
