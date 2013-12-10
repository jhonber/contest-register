
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
      if(err){
        return res.render('/user/register', {user : user , failureFlash : true });
      }
      res.redirect('/');
    });
  },

  show : function(req, res){
    res.render('account', { user: req.user });
  },

  login : function(req, res){
      res.render('login', { user: req.user, message: req.flash('error') });
  },

  successLogin : function(req, res) {
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
