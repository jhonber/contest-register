
/*
 * GET users listing.
 */
var User = require('../models/users');

module.exports = {
  list : function(req, res){
           res.send("respond with a resource");
  },

  register : function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
      if(err)
        res.render('register', {user : user, message: err, type : 'error', failureFlash : true });
      else{
        req.flash('info', 'success register');
        res.redirect('/');
      }
    });
  },

  show : function(req, res){
    res.render('account', { user: req.user });
  },

  login : function(req, res){
      var err = req.flash('error');
      if(err == "") err = null;
      res.render('login', { user: req.user, message: err, type : 'error', failureFlash : true  });
  },

  successLogin : function(req, res) {
    //res.render('login', {message : 'success login' , type : 'success'} );
    req.flash('info','success login');
    res.redirect('/');
  },

  logout : function(req, res){
    req.logout();
    res.redirect('/');
  },

  getRegister : function(req, res){
    res.render('register', {});
  }


};
