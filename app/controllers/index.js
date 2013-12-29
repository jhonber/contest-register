
/*
 * GET home page.
 */

exports.index = function(req, res){
  require('./general')(req,res);
  var message = req.flash('info');
  var type = req.flash('type');
  if(message == "") message = null;
  if(type == "") type =  null;

  res.render('index', { title: 'Contest Register', user : req.user , message : message , type : type });
};
