var mongoose = require('mongoose');

var Contest = new mongoose.Schema({
    contestname : String,
    date : Date
});

module.exports = mongoose.model('Contest', Contest);
