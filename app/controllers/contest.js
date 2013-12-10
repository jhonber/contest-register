var mongoose = require('mongoose');
//  , Contest = mongoose.model('Contest');
var Contest = require('../models/contests');

module.exports = {

  list : function(req, res){
    Contest.find({}, function(err, cont){
      res.render('contests', { user : req.user , contests : cont});
    });

  },

  create: function(req, res){
    var c = new Contest({ contestname: req.body.name, date : Date.now() });
    c.save(function (err) {
      if (err) return handleError(err);
    });

    res.render('contests', {user : req.user});
  }

};
