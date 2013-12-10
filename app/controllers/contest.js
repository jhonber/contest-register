var mongoose = require('mongoose');
//  , Contest = mongoose.model('Contest');
var Contest = require('../models/contests');

module.exports = {

  list : function(req, res){

    var c1 = new Contest({ contestname: "Maraton viernes", date : Date.now() });
    var c2 = new Contest({ contestname: "Maraton sábado", date : Date.now() });

    c1.save(function (err) {
      if (err) return handleError(err);
    });

    c2.save(function (err) {
      if (err) return handleError(err);
    });

    Contest.find({}, function(err, cont){
      res.render('contests', { user : req.user , contests : cont});
    });

  }

};
