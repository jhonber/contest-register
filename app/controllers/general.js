
module.exports = function(req, res){
  for (k in req.user){
    if(k=='github'){
      req.user = req.user['github'];
    }
    else if(k=='google'){
      req.user = req.user['google'];
    }
    else if(k=='facebook'){
      req.user = req.user['facebook'];
    }
  }
};
